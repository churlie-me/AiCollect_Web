import { element } from 'protractor';
import { Answer } from './../../models/Answer';
import { Component, ElementRef, ViewChild } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Questionaire } from 'src/models/Questionaire';
import { Config } from 'src/settings/config';
import { Certification } from 'src/models/Certification';
import { FieldInspection } from 'src/models/FieldInspection';
import { Statuses, DataTypes, DataCollectionObectTypes } from 'src/enums/enums';
import { Question } from 'src/models/Question';
import * as XLSX from 'xlsx';
import { DomSanitizer } from '@angular/platform-browser';
import { SkipCondition } from 'src/models/SkipCondition';
import { Dependency } from 'src/models/Dependency';
declare let $ : any;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent {
  currentCount = 0
  questionaires: Questionaire[]
  certifications: Certification[]
  inspections: FieldInspection[]
  questionaire: Questionaire
  statuses = Statuses
  dataTypes = DataTypes
  Id: string
  ConfigurationId: string
  type: string
  filename: string = ""
  dependencies: Dependency[] = []
  conditions: any[] = []
  dependencyQuestions: Question[] = []
  tabDependencies: Dependency[] = []
  action : number = 0
  isBusy : boolean = false
  @ViewChild('closex') closex: ElementRef;
  @ViewChild('closec') closec : ElementRef
  @ViewChild("info") info : ElementRef;

  constructor(private httpClient: HttpClient, private config: Config, private router: Router, private activatedRoute: ActivatedRoute, private domSanitizer: DomSanitizer) {

  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.Id = params["Id"];
      this.ConfigurationId = params['ConfigurationId']
      this.type = params['type']
    })

    switch(this.type)
    {
      case 'questionaire':
        this.httpClient.get(this.config.REST_API_SERVICE + "/questionaire/overview/" + this.Id).subscribe(data => {
          let json = JSON.stringify(data)
          this.questionaires = <Questionaire[]>JSON.parse(json)
          $('#overview').editableTableWidget().numericInputExample().find('td:first').focus();
        })
        break;
    }
  }

  InitQuestionaire(event, _action)
  {
    this.action = _action
    this.questionaire = this.questionaires.find(q => q.Key == event.currentTarget.id.toString())
    this.conditions = []
  }

  public EnumDescription(question: Question, Code: any)
  {
    if(question.EnumList.EnumValues.length > 0)
    {
      var _enum = question.EnumList.EnumValues.find(x => x.Code == Code)
      if(_enum)
        return _enum.Description
    }

    return undefined
  }

  initImage(base64: any)
  {
    return "data:'image/jpeg';base64, " + base64
  }

  ExportExcel(): void
  {
    //hide actions column
    let col_th = document.getElementsByTagName("th")
    col_th[0].setAttribute("display", "none");

    //col_hide.style.display = "none"
    this.filename = "Questionaire Registration" + ".xls"
    /* table id is passed over here */
    let element = document.getElementById('overview');
    let ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Questionaires');


    this.dependencyQuestions.forEach(dqn => {
      let _element = document.getElementById(dqn.Key);

      let sheet = XLSX.utils.table_to_sheet(_element);
      XLSX.utils.book_append_sheet(wb, sheet, (dqn.QuestionText.length > 31)? dqn.QuestionText.slice(0, 31) : dqn.QuestionText );
    })

    /* save to file */
    XLSX.writeFile(wb, this.filename);

    col_th[0].setAttribute("display", "block");
  }

  ExportCsv() {
    $("#overview").tableToCSV();
  }

  linkIndentifier(dependency : Dependency)
  {
    let questionaireKey = dependency.Target.SubSection.Questions.map(function(question)
    {
      if(question.Answers.length > 0)
        return question.Answers[0].QuestionaireKey
    })

    if(questionaireKey.length > 0)
    {
      let _questionaire = this.questionaires.find(q => q.Key == questionaireKey[0])
      if(_questionaire)
        return _questionaire.Sections[0].Questions[0].Answers[0].AnswerText
    }
  }

  determineDependency(question, dependency)
  {
    if(this.dependencyQuestions.find(qn => qn.Key == question.Key) == undefined)
      this.dependencyQuestions.push(question)

    if(this.dependencies.find(d => d == dependency) == undefined)
      this.dependencies.push(dependency)
  }

  isDependency(subSection)
  {
    if(this.dependencies.length > 0)
    {
      let dependency = this.dependencies.find(d => d.Target.SubSection.Key == subSection)
      let isDependency = dependency != undefined
      return isDependency
    }

    return false
  }

  getQuestionaire()
  {
      this.questionaires.map(function(questionare){
        questionare.Sections[0].Questions[0].Answers[0].AnswerText
      })
  }

  dependencyHead(key)
  {
    let dependency =  this.dependencies.find(d => d.QuestionKey == key)
    return dependency
  }

  getTabDependencies(key)
  {
    this.tabDependencies = []
    this.dependencies.forEach(x =>
      {
        if(x.QuestionKey == key)
            this.tabDependencies.push(x)
      })

    return this.tabDependencies
  }

  determineCondition(condition: SkipCondition)
  {
    debugger
    switch(condition.DataCollectionObectType)
    {
      case DataCollectionObectTypes.SubSection:
        debugger
        this.conditions.push(condition.Target.SubSection.Key)
        break;

      case DataCollectionObectTypes.Section:
        this.conditions.push(condition.Target.Section.Key)
        break;

      case DataCollectionObectTypes.Question:
        this.conditions.push(condition.Target.Question.Key)
        break;
    }
  }

  IsCondition(key)
  {
    debugger
    if(this.conditions.length > 0)
      return this.conditions.find(x => x == key) != undefined

    return false
  }

  async UpdateQuestionaire()
  {
    this.isBusy = true
    let json = JSON.stringify(this.questionaire)
    await this.httpClient.post(this.config.REST_API_SERVICE + "/sync/questionaire", json, {headers : this.config.headers}).subscribe(async data => {
        debugger;
        this.isBusy = false

        if(!this.questionaire.Deleted)
        {
          this.closex.nativeElement.click()
          await new Promise(resolve => setTimeout(resolve, 2000))
          //this.info.nativeElement.click()
        }
        else
          this.closec.nativeElement.click()
    });
  }

  DeleteQuestionaire()
  {
    debugger
    this.isBusy = true
    this.questionaire.Deleted = true

    var self = this;
    this.dependencies.map(function(dependency){
      if(dependency.TargetObjectType == DataCollectionObectTypes.SubSection)
      {
        let keys = dependency.Target.SubSection.Questions.map(function(question)
        {
          if(question.Answers.length > 0)
            return question.Answers[0].QuestionaireKey
        })

        if(keys.find(k => k == self.questionaire.Key) != undefined)
          dependency.Deleted = true
      }
    })
    this.UpdateQuestionaire()
  }
}
