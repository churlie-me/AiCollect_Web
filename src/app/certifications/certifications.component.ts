import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Certification } from 'src/models/Certification';
import { Config } from 'src/settings/config';

@Component({
  selector: 'app-crtifications',
  templateUrl: './certifications.component.html'
})
export class CertificationsComponent {
  currentCount = 0
  certifications: Certification[];
  Id: string
  certification
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
      this.initCertifications()
  }

  initCertifications()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/Certification/configuration/" + this.Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.certifications = <Certification[]>JSON.parse(json)
    })
  }

  SetCertification(event)
  {
    debugger

    if(event != undefined)
      this.certification = this.certifications.find(c => c.Key == event.currentTarget.id.toString())
  }

  async DeleteCertification()
  {
    debugger
    this.x_confirmed.nativeElement.click()
    this.certification.Deleted = true;
    await new Promise(resolve => setTimeout(resolve, 500))
    this.pleasewait.nativeElement.click()

    let json = JSON.stringify(this.certification)
    
    this.httpClient.post(this.config.REST_API_SERVICE + "/certification/", json, {headers: this.config.headers}).subscribe(async data => {
      this.certifications = []
      this.initCertifications()
      await new Promise(resolve => setTimeout(resolve, 500))
      this.x_pleasewait.nativeElement.click()
    })
  }
}
