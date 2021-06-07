import { Target } from "src/models/Target";
import { Component, ElementRef, ViewChild } from "@angular/core";
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Questionaire } from "src/models/Questionaire";
import { Config } from "src/settings/config";
import { Certification } from "src/models/Certification";
import { FieldInspection } from "src/models/FieldInspection";
import { Statuses, DataTypes, DataCollectionObectTypes } from "src/enums/enums";
import { Report } from "src/models/Report";
import { Question } from "src/models/Question";
import * as XLSX from "xlsx";
import { Dependency } from "src/models/Dependency";
import { SkipCondition } from "src/models/SkipCondition";
declare let $: any;

@Component({
  selector: "inspections_review",
  templateUrl: "./inspections_review.component.html",
})
export class InspectionsReviewComponent {
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

  constructor(
    private httpClient: HttpClient,
    private config: Config,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.Id = params["Id"];
    });

    this.httpClient
      .get(this.config.REST_API_SERVICE + "/inspection/reports/" + this.Id)
      .subscribe(
        (data) => {
          let json = JSON.stringify(data);
          this.reports = <Report[]>JSON.parse(json);
        },
        (error) => console.log(error)
      );
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

  isDependency(subSectionKey)
  {
    if(this.dependencies.length > 0)
    {
      let isDependency = this.dependencies.find(d => d.Target.SubSection.Key == subSectionKey) != undefined
      return isDependency
    }
    return false
  }

  determineDependency(question, dependency)
  {
    if(this.dependencyQuestions.find(qn => qn.Key == question.Key) == undefined)
      this.dependencyQuestions.push(question)

    if(this.dependencies.find(d => d == dependency) == undefined)
      this.dependencies.push(dependency)
  }

  initImage(base64: any) {
    return "data:'image/jpeg';base64, " + base64;
  }

  InitReport(event, action) {
    this.action = action
    this.report = this.reports.find(
      (q) => q.FieldInspection.Key == event.currentTarget.id.toString()
    );
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

  ExportExcel(): void {
    this.filename = "Field Registration" + ".xls";
    /* table id is passed over here */
    let element = document.getElementById("inspections");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.filename);
  }

  ExportCsv() {
    $("#inspections").tableToCSV();
  }

  linkIndentifier(dependency : Dependency)
  {
    let fieldKeys = dependency.Target.SubSection.Questions.map(function(question)
    {
      if(question.Answers.length > 0)
        return question.Answers[0].FieldKey
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

  DeleteField()
  {
    debugger
    this.isBusy = true
    this.report.FieldInspection.Deleted = true

    var self = this;
    this.dependencies.map(function(dependency){
      if(dependency.TargetObjectType == DataCollectionObectTypes.SubSection)
      {
        let keys = dependency.Target.SubSection.Questions.map(function(question)
        {
          if(question.Answers.length > 0)
            return question.Answers[0].QuestionaireKey
        })

        if(keys.find(k => k == self.report.FieldInspection.Key) != undefined)
          dependency.Deleted = true
      }
    })

    this.UpdateField()
  }

  async UpdateField()
  {
    this.isBusy = true
    let json = JSON.stringify(this.report.FieldInspection)
    await this.httpClient.post(this.config.REST_API_SERVICE + "/sync/inspection", json, {headers : this.config.headers}).subscribe(async data => {
        debugger;
        this.isBusy = false

        if(!this.report.FieldInspection.Deleted)
        {
          this.closex.nativeElement.click()
          await new Promise(resolve => setTimeout(resolve, 2000))
          //this.info.nativeElement.click()
        }
        else
          this.closec.nativeElement.click()
    });
  }
}
