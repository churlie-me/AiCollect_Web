import { Component, ViewChild } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/models/Client';
import { User } from 'src/models/User';
import { Configuration } from 'src/models/Configuration';
import { ConfigurationVersion } from 'src/models/ConfigurationVersion';
import { Config } from 'src/settings/config';
import { ConfigurationTypes } from 'src/enums/enums';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html'
})
export class ConfigurationsComponent {
  currentCount = 0
  configurations: Configuration[]
  configuration: Configuration
  Id: string
  configurationTypes = ConfigurationTypes
  keys: any[]
  @ViewChild("x_configuration") x_configuration: any
  @ViewChild("x_pleasewait") x_pleasewait: any
  @ViewChild("pleasewait") pleasewait: any
  @ViewChild("x_confirmed") x_confirmed: any


  constructor(private httpClient: HttpClient, private config: Config, private router: Router, private activatedRoute: ActivatedRoute) {  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      this.Id = params['Id']
    });
    debugger
    this.keys = Object.keys(this.configurationTypes).filter(k => !isNaN(Number(k)))
    this.Init()
  }

  Init()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/configuration/client/" + this.Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.configurations = JSON.parse(json)
    });
  }

  OnSubmit(data) {
    debugger
    if(this.configurations.filter(c => c.Name == data.Name).length == 0)
    {
      this.configuration = new Configuration()
      this.configuration.Name = data.Name
      this.configuration.FileName = data.Name
      this.configuration.Type = data.Type
      this.configuration.CreatedOn = new Date()
      this.configuration.ConfigVersion = new ConfigurationVersion()
      this.configuration.ConfigVersion.Major = 1
      this.configuration.ConfigVersion.Minor = 0
      this.configuration.ConfigVersion.Build = 0
      this.configuration.ConfigVersion.ConfigfileVersion = 0
      this.configuration.Client = new Client()
      this.configuration.Client.OID = this.Id
      debugger
      let json = JSON.stringify(this.configuration)

      this.httpClient.post(this.config.REST_API_SERVICE + "/configuration/", json, {headers: this.config.headers}).subscribe(async data => {
        debugger
        if(data != false)
        {
          this.x_configuration.nativeElement.click()
          await new Promise(resolve => setTimeout(resolve, 1000))

          this.configuration = JSON.parse(JSON.stringify(data))
          if(this.configuration != null)
            this.router.navigate(['configuration'], { queryParams: {configuration_ID: this.configuration.OID, Id: this.configuration.Client.OID}})
        }
        else
        {
          alert("Something went wrong, please try again or contact our support team for assistence")
        }
      })
    }
    else
      alert("You cannot have more than one configuration with the same name")
  }

  SetConfiguration(event)
  {
    debugger

    if(event != undefined)
      this.configuration = this.configurations.find(c => c.OID == event.currentTarget.id.toString())
    else
      this.configuration = new Configuration();
  }

  async DeleteConfiguration()
  {
    debugger
    this.x_confirmed.nativeElement.click()
    this.configuration.Deleted = true;
    await new Promise(resolve => setTimeout(resolve, 500))
    this.pleasewait.nativeElement.click()

    let json = JSON.stringify(this.configuration)
    
    this.httpClient.post(this.config.REST_API_SERVICE + "/configuration/", json, {headers: this.config.headers}).subscribe(async data => {
      this.Init()
      await new Promise(resolve => setTimeout(resolve, 500))
      this.x_pleasewait.nativeElement.click()
    })
  }
}
