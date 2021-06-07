import { Component, ViewChild } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Training } from 'src/models/Training';
import { Trainer } from 'src/models/Trainer';
import { Topic } from 'src/models/Topic';
import { Config } from 'src/settings/config';
import { Guid } from 'guid-typescript';
import { Questionaire } from 'src/models/Questionaire';
import { Location } from '@angular/common';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html'
})
export class TrainingComponent {
  currentCount = 0
  REST_API_SERVER = "http://localhost/aicollectwebapi/api"
  public training: Training
  trainers : Trainer[]
  topics : Topic[]
  trainees: Questionaire[] = []
  configuration_ID: number
  Id: number
  @ViewChild('init_training') init_training : any
  @ViewChild('x_training') x_training: any
  @ViewChild('x_topic') x_topic: any
  @ViewChild('x_trainer') x_trainer: any

  constructor(public location: Location, private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute,
    private config: Config) {  }

  ngOnInit() {
    debugger
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      this.configuration_ID = <number>params['Configuration_Id']
      this.Id = params['Id']
    })
    debugger

    if(this.Id != undefined)
    {
      this.httpClient.get(this.config.REST_API_SERVICE + "/training/" + this.Id).subscribe(data => {
        debugger
        this.training = <Training>JSON.parse(JSON.stringify(data))

        this.InitTopic()
        this.InitTrainer()
        this.InitTrainees()
      })
    }
    else
      this.init_training.nativeElement.click()
  }

  async OnCancel() {
    debugger
    await new Promise(resolve => setTimeout(resolve, 500))
    this.location.back();
  }

  OnCreateTraining(data)
  {
    this.training = new Training()
    this.training.Name = data.Name
    this.training.Location = data.Location
    this.training.StartDate = data.StartDate
    this.training.EndDate = data.EndDate
    this.training.ConfigurationId = this.configuration_ID 
    this.training.Topics = []
    this.training.Trainees = []
    this.training.Trainers = []

    debugger
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Accept': 'application/json'})
    let json = JSON.stringify(this.training)
    this.httpClient.post(this.config.REST_API_SERVICE + "/training/", json, {headers: this.config.headers}).subscribe(data => {
      debugger
      this.training = undefined
      this.training = JSON.parse(JSON.stringify(data))
      this.router.navigate(['training'], { queryParams: { 'Configuration_Id': this.configuration_ID, 'Id': this.training.OID } })
    })

    this.x_training.nativeElement.click()
  }

  OnSave(data) {
    debugger
    let json = JSON.stringify(this.training)
    this.httpClient.post(this.config.REST_API_SERVICE + "/training/", json).subscribe(data => {
      debugger
    }, err => alert(err))
  }

  InitTopic()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/topic/training/" + this.training.Key).subscribe(data => {
      debugger
      this.training.Topics = <Topic[]>JSON.parse(JSON.stringify(data))
    })
  }

  OnTopicSubmitted(data)
  {
    debugger
    var topic = new Topic()
    topic.Key = Guid.create().toString()
    topic.Name = data.Name
    topic.TrainingId = this.training.Key

    let json = JSON.stringify(topic)
    this.httpClient.post(this.config.REST_API_SERVICE + "/topic/", json, {headers: this.config.headers}).subscribe(data => {
      debugger
      this.x_topic.nativeElement.click()
      this.InitTopic()
    }, err => alert(err))
  }

  InitTrainer()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/trainer/training/" + this.training.Key).subscribe(data => {
      debugger
      this.training.Trainers = <Trainer[]>JSON.parse(JSON.stringify(data))
    })
  }

  OnTrainerSubmitted(data)
  {
    debugger
    var trainer = new Trainer()
    trainer.Key = Guid.create().toString()
    trainer.Name = data.Name
    trainer.TrainingId = this.training.Key

    let json = JSON.stringify(trainer)
    this.httpClient.post(this.config.REST_API_SERVICE + "/trainer/", json, {headers: this.config.headers}).subscribe(data => {
      debugger
      this.x_trainer.nativeElement.click()
      this.InitTrainer()
    }, err => alert(err))
  }

  InitTrainees()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/trainee/training/" + this.training.Key).subscribe(data => {
      debugger
      this.trainees = <Questionaire[]>JSON.parse(JSON.stringify(data))
    })
  }
}
