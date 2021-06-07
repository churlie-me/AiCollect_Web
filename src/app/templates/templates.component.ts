import { Component, ViewChild } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Questionaire } from 'src/models/Questionaire';
import { Config } from 'src/settings/config';
import { Template } from 'src/models/template';
import { TemplateType } from 'src/enums/enums';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html'
})
export class TemplatesComponent {
  templates: Template[];
  template: Template
  templateTypes = TemplateType
  Id: string
  @ViewChild("x_configuration") x_configuration: any
  @ViewChild("x_pleasewait") x_pleasewait: any
  @ViewChild("pleasewait") pleasewait: any
  @ViewChild("x_confirmed") x_confirmed: any

  constructor(private httpClient: HttpClient, private config: Config, private router: Router, private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
    debugger
    this.httpClient.get(this.config.REST_API_SERVICE + "/template/").subscribe(async data => {
      debugger
      let json = JSON.stringify(data)
      this.templates = <Template[]>JSON.parse(json)
    })
  }

  SetTemplate(event)
  {
    debugger

    if(event != undefined)
      this.template = this.templates.find(c => c.OID == event.currentTarget.id.toString())
  }

  async DeleteTemplate()
  {
    debugger
    this.x_confirmed.nativeElement.click()
    this.template.Deleted = true;
    await new Promise(resolve => setTimeout(resolve, 500))
    //this.pleasewait.nativeElement.click()
    let json = JSON.stringify(this.template)
    
    this.httpClient.post(this.config.REST_API_SERVICE + "/template/", json, {headers: this.config.headers}).subscribe(async data => {
      await new Promise(resolve => setTimeout(resolve, 500))
      this.x_pleasewait.nativeElement.click()
      this.ngOnInit()
    })
  }
}
