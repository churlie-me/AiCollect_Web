import { Component, ElementRef, ViewChild } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Config } from 'src/settings/config';
import { Statuses, DataTypes, DataCollectionObectTypes } from 'src/enums/enums';
import { Report } from 'src/models/Report';
import { Question } from 'src/models/Question';
import * as XLSX from 'xlsx';
import { Dependency } from 'src/models/Dependency';
import { SkipCondition } from 'src/models/SkipCondition';
declare let $ : any;

@Component({
  selector: 'certifications_review',
  templateUrl: './certifications_review.component.html'
})
export class CertificationsReviewComponent {
  currentCount = 0;
  reports: Report[];
  Id: string;
  report: Report;
  statuses = Statuses;
  dataTypes = DataTypes;
  filename: string;
  dependencies: Dependency[] = [];
  conditions: string[] = [];
  dependencyQuestions: Question[] = [];
  tabDependencies: Dependency[] = [];
  action : number = 0
  isBusy : boolean = false
  @ViewChild('closex') closex: ElementRef;
  @ViewChild('closec') closec : ElementRef
  @ViewChild("info") info : ElementRef;

  constructor(private httpClient: HttpClient, private config: Config, private router: Router, private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.Id = params["Id"];
    })

    this.httpClient.get(this.config.REST_API_SERVICE + "/certification/reports/" + this.Id).subscribe(data => {
      let json = JSON.stringify(data)
      this.reports = <Report[]>JSON.parse(json)
    })
  }

  public EnumDescription(question: Question, Code: any)
  {
    if(question.EnumList.EnumValues.length > 0)
      return question.EnumList.EnumValues.find(x => x.Code == Code).Description
  }

  isDependency(subSection)
  {
    let isDependency = this.dependencies.find(d => d.Target.SubSection.Key == subSection.Key) == undefined
    return isDependency
  }

  determineDependency(question, dependency)
  {
    if(this.dependencyQuestions.find(qn => qn.Key == question.Key) == undefined)
      this.dependencyQuestions.push(question)

    if(this.dependencies.find(d => d == dependency) == undefined)
      this.dependencies.push(dependency)
  }

  initImage(base64: any)
  {
    return "data:'image/jpeg';base64, " + base64
  }

  InitReport(event,action)
  {
    this.action = action
    this.report = this.reports.find(q => q.Certification.Key == event.currentTarget.id.toString())
  }

  IsCondition(key)
  {
    debugger
    if(this.conditions.length > 0)
      return this.conditions.find(x => x == key) != undefined

    return false
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

  ExportExcel(): void
  {
    this.filename = Date.now().toString() + ".xls"
      /* table id is passed over here */
      let element = document.getElementById('certification_review');
      const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.filename);
  }

  ExportCsv() {
    $("#certification_review").tableToCSV();
  }

  linkIndentifier(dependency : Dependency)
  {
    let fieldKeys = dependency.Target.SubSection.Questions.map(function(question)
    {
      if(question.Answers.length > 0)
        return question.Answers[0].CertificationKey
    })

    if(fieldKeys.length > 0)
    {
      let _report = this.reports.find(q => q.Questionaire.Key == fieldKeys[0])
      if(_report)
        return _report.Questionaire.Name
    }
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

  DeleteCertification()
  {
    debugger
    this.isBusy = true
    this.report.Certification.Deleted = true

    var self = this;
    this.dependencies.map(function(dependency){
      if(dependency.TargetObjectType == DataCollectionObectTypes.SubSection)
      {
        let keys = dependency.Target.SubSection.Questions.map(function(question)
        {
          if(question.Answers.length > 0)
            return question.Answers[0].QuestionaireKey
        })

        if(keys.find(k => k == self.report.Certification.Key) != undefined)
          dependency.Deleted = true
      }
    })

    this.UpdateCertification()
  }

  async UpdateCertification()
  {
    this.isBusy = true
    let json = JSON.stringify(this.report.Certification)
    await this.httpClient.post(this.config.REST_API_SERVICE + "/sync/certification", json, {headers : this.config.headers}).subscribe(async data => {
        debugger;
        this.isBusy = false

        if(!this.report.Certification.Deleted)
        {
          this.closex.nativeElement.click()
          this.info.nativeElement.click()
        }
        else
          this.closec.nativeElement.click()
    });
  }
}
