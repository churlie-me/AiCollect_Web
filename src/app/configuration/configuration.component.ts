import { Component, ViewChild } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/models/Client';
import { User } from 'src/models/User';
import { Configuration } from 'src/models/Configuration';
import { Config } from 'src/settings/config';
import { PermisionType, ObjectType, ConfigurationTypes } from 'src/enums/enums';
import { UserRight } from 'src/models/UserRight';
import { Guid } from 'guid-typescript';
import { Questionaire } from 'src/models/Questionaire';
import { FieldInspection } from 'src/models/FieldInspection';
import { Training } from 'src/models/Training';
import { Certification } from 'src/models/Certification';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html'
})
export class ConfigurationComponent {
  currentCount = 0
  public configuration: Configuration
  permissionTypes = PermisionType
  objectTypes = ObjectType
  configurationTypes = ConfigurationTypes
  okeys: any[]
  pkeys: any[]
  client : Client
  configuration_ID: number
  client_ID: string
  users : User[]
  user : User
  userRight : UserRight
  questionaires: Questionaire[]
  inspections: FieldInspection[]
  trainings: Training[]
  certifications: Certification[]
  confirmation_action: string
  @ViewChild('x_configuration_user') x_configuration_user: any
  @ViewChild('x_userright') x_userright: any
  @ViewChild('x_confirmed') x_confirmed: any
  @ViewChild('i_pleasewait') i_pleasewait: any
  @ViewChild('x_pleasewait') x_pleasewait: any

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private config: Config) {  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.configuration_ID = <number>params['configuration_ID']
      this.client_ID = params['Id']
    });
    debugger;

    this.httpClient.get(this.config.REST_API_SERVICE + "/configuration/" + this.configuration_ID).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.configuration = JSON.parse(json)
    },
    error => console.log('Oops', error)
    );

    this.InitConfigurationUsers()
    this.InitClientUsers()

    this.pkeys = Object.keys(this.permissionTypes).filter(k => !isNaN(Number(k)))
    this.okeys = Object.keys(this.objectTypes).filter(k => !isNaN(Number(k)))
  }

  InitUser(){
    this.user = new User()
    this.user.UserRights = []
  }

  InitUserRight()
  {
    debugger
    this.userRight = new UserRight();
    this.userRight.Configuration = new Configuration()
    this.userRight.Configuration.OID = this.configuration_ID
    this.userRight.UserPermissions = [];
  }

  ModifyUserRight(event)
  {
    debugger
    this.confirmation_action = "userright"
    this.userRight = this.user.UserRights.find(p => p.Key == event.currentTarget.id.toString())
  }

  PermissionChanged(event)
  {
      debugger
  }

  DeleteUserRight()
  {
    this.user.UserRights.splice(this.user.UserRights.indexOf(this.userRight),1)
    this.x_confirmed.nativeElement.click()
  }

  ObjectTypeChanged(value)
  {
    if(value = 0)
      this.userRight.PrimaryKey = this.configuration.Key
  }

  async RemoveUser()
  {
    debugger
    this.user.ConfigurationId = this.configuration_ID
    
    let json = JSON.stringify(this.user);
      
    this.i_pleasewait.nativeElement.click()
    this.x_confirmed.nativeElement.click()
    await new Promise(resolve => setTimeout(resolve, 500))
    this.httpClient.post(this.config.REST_API_SERVICE + "/user/configuration/delete/", json, {headers: this.config.headers}).subscribe(async data => {
      debugger;
      this.x_pleasewait.nativeElement.click()
      this.InitConfigurationUsers()
    });
  }

  OnSubmitUserRight(data)
  {
    debugger
    this.userRight = data.UserRight
    this.userRight.ObjectName = this.objectTypes[data.objectType]
    this.userRight.ObjectType = data.objectType
    this.userRight.PrimaryKey = data.PrimaryKey
    this.userRight.SecondaryKey = data.SecondaryKey    

    if(this.user.UserRights.find(x => x.Key == this.user.Key) == undefined)
      this.user.UserRights.push(this.userRight);

    this.x_userright.nativeElement.click()
  }
  
  InitClientUsers()
  {
    debugger
    this.httpClient.get(this.config.REST_API_SERVICE + "/user/client/" + this.client_ID).subscribe(data => {
      let json = JSON.stringify(data);
      this.client = new Client()
      this.client.Users = <User[]>JSON.parse(json);
    });
  }

  InitConfigurationUsers()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/user/configuration/" + this.configuration_ID).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.users = <User[]>JSON.parse(json)
    });
  }

  UserChanged(value)
  {
    debugger
    //this.user = this.client.Users.find(x => x.Key == value)
  }

  ModifyUser(event)
  {
    debugger
    this.confirmation_action = "user"
    this.user = this.users.find(u => u.Key == event.currentTarget.id.toString())
    if(this.user.UserRights == undefined)
      this.user.UserRights = []
  }

  AddConfigurationUser(data) {
    debugger;
    if(this.configuration)
    {
      let s_user = this.client.Users.find(x => x.Email == data.Email)
      this.user.OID = s_user.OID
      this.user.Email = s_user.Email
      this.user.Key = s_user.Key
      this.user.ConfigurationId = this.configuration_ID

      if(this.user.UserRights.length == 0)
      {
        this.userRight = new UserRight()
        this.userRight.Key = Guid.create().toString()
        this.userRight.ObjectName = this.configuration.Name
        this.userRight.ObjectType = this.objectTypes.Configuration
        this.userRight.PrimaryKey = this.configuration.Key
        this.user.UserRights.push(this.userRight);
      }

      let json = JSON.stringify(this.user);

      this.x_configuration_user.nativeElement.click()
      this.httpClient.post(this.config.REST_API_SERVICE + "/user/configuration/", json, {headers: this.config.headers}).subscribe(data => {
        debugger;
        this.InitConfigurationUsers()
      });
    }
  }
}
