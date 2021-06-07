import { Component } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/models/Client';
import { User } from 'src/models/User';
import { Configuration } from 'src/models/Configuration';
import { ConfigurationVersion } from 'src/models/ConfigurationVersion';
import { Questionaire } from 'src/models/Questionaire';
import { FieldInspection } from 'src/models/FieldInspection';
import { Training } from 'src/models/Training';
import { Config } from 'src/settings/config';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html'
})
export class TrainingsComponent {
  currentCount = 0
  REST_API_SERVER = "http://localhost/aicollectwebapi/api"
  trainings: Training[]
  training: Training
  Id: string


  constructor(private httpClient: HttpClient, private config: Config, private router: Router, private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      this.Id = params['Id']
    })
    debugger
    this.httpClient.get(this.config.REST_API_SERVICE + "/training/configuration/" + this.Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.trainings = <Training[]>JSON.parse(json)
    })
  }
}
