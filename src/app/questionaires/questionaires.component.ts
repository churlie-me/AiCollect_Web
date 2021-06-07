import { Component, ViewChild } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Questionaire } from 'src/models/Questionaire';
import { Config } from 'src/settings/config';

@Component({
  selector: 'app-questionaires',
  templateUrl: './questionaires.component.html'
})
export class QuestionairesComponent {
  currentCount = 0
  questionaires: Questionaire[];
  Id: string
  questionaire
  @ViewChild("x_pleasewait") x_pleasewait: any
  @ViewChild("pleasewait") pleasewait: any
  @ViewChild("x_confirmed") x_confirmed: any
  constructor(private httpClient: HttpClient, private config: Config, private router: Router, private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      this.Id = params['Id']
    })
    debugger
    if(this.Id != undefined)
      this.initQuestionaires()
  }

  initQuestionaires()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/questionaire/configuration/" + this.Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.questionaires = <Questionaire[]>JSON.parse(json)
    })
  }

  SetQuestionaire(event)
  {
    debugger

    if(event != undefined)
      this.questionaire = this.questionaires.find(c => c.Key == event.currentTarget.id.toString())
  }

  async DeleteQuestionaire()
  {
    debugger
    this.x_confirmed.nativeElement.click()
    this.questionaire.Deleted = true;
    await new Promise(resolve => setTimeout(resolve, 500))
    this.pleasewait.nativeElement.click()

    let json = JSON.stringify(this.questionaire)
    
    this.httpClient.post(this.config.REST_API_SERVICE + "/questionaire/", json, {headers: this.config.headers}).subscribe(async data => {
      this.questionaires = []
      this.initQuestionaires()
      await new Promise(resolve => setTimeout(resolve, 500))
      this.x_pleasewait.nativeElement.click()
    })
  }
}
