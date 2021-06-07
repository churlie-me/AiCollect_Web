import { Component, ViewChild } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FieldInspection } from 'src/models/FieldInspection';
import { Config } from 'src/settings/config';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.component.html'
})
export class InspectionsComponent {
  currentCount = 0
  inspections: FieldInspection[];
  Id: string
  inspection
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

    if(this.Id)
      this.initInspections();
  }

  SetInspection(event)
  {
    debugger

    if(event != undefined)
      this.inspection = this.inspections.find(c => c.Key == event.currentTarget.id.toString())
  }

  initInspections()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/inspection/configuration/" + this.Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.inspections = <FieldInspection[]>JSON.parse(json)
    })
  }

  async DeleteInspection()
  {
    debugger
    this.x_confirmed.nativeElement.click()
    this.inspection.Deleted = true;
    await new Promise(resolve => setTimeout(resolve, 500))
    this.pleasewait.nativeElement.click()

    let json = JSON.stringify(this.inspection)
    
    this.httpClient.post(this.config.REST_API_SERVICE + "/inspection/", json, {headers: this.config.headers}).subscribe(async data => {
      this.inspections = []
      this.initInspections()
      await new Promise(resolve => setTimeout(resolve, 500))
      this.x_pleasewait.nativeElement.click()
    })
  }
}
