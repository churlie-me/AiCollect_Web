import { Target } from 'src/models/Target';
import { Component, ViewChild, ElementRef } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/models/Client';
import { User } from 'src/models/User';
import { Config } from 'src/settings/config';
import { AuthenticationService } from 'src/services/authentication.service';
import { Package } from 'src/models/Package';
import { ImageConverter } from 'src/services/image.converter.service';

@Component({
  selector: 'app-client-component',
  templateUrl: './client.component.html'
})
export class ClientComponent {
  public currentCount = 0;
  public client: Client;
  public clientId: number;
  public users : User[];
  public user : User
  public loggedInUser: User
  public packages: Package[]
  public logo: any
  public event: any
  @ViewChild("x_user") x_user : ElementRef;
  @ViewChild("x_client") x_client: ElementRef
  @ViewChild("activation") activation : ElementRef
  @ViewChild("x_activation") x_activation: ElementRef
  @ViewChild("i_pleasewait") i_pleasewait: ElementRef
  @ViewChild("x_pleasewait") x_pleasewait : ElementRef

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute,
    private config: Config, public authentication: AuthenticationService, private imageConverter: ImageConverter) {  }

  ngOnInit()
  {
    debugger
    this.activatedRoute.queryParams.subscribe(params => {
      this.clientId = params['Id'];
    });
    debugger;

    this.httpClient.get(this.config.REST_API_SERVICE + "/package").subscribe(data => {
      debugger;
      let json = JSON.stringify(data);
      this.packages = <Package[]>JSON.parse(json);
    });

    this.httpClient.get(this.config.REST_API_SERVICE + "/clients/" + this.clientId).subscribe(data => {
      debugger;
      let json = JSON.stringify(data);
      this.client = <Client>JSON.parse(json);
      if(this.client.Logo)
        this.logo = this.imageConverter.ConvertToImage(this.client.Logo);
      this.user = this.client.Users.find(x => x.IsAdmin);
      this.InitUsers()
    });
  }

  IsEnabled(enabled)
  {
    return enabled? "Enabled" : "Disabled"
  }

  OnToggle(event, user)
  {
    debugger
    this.event = event
    this.user = user
    if(!event.target.checked)
    {
      this.event.target.checked = !this.event.target.checked
      this.activation.nativeElement.click()
    }
    else
      this.ToggleActivation()
  }

  OnCancel()
  {
    debugger
    this.x_activation.nativeElement.click()
  }

  ToggleActivation()
  {
    debugger
    this.user.Enabled = !this.user.Enabled
    this.SaveUser()
  }

  SaveUser()
  {
    debugger
    this.i_pleasewait.nativeElement.click()
    this.httpClient.post(this.config.REST_API_SERVICE + "/user/", this.user, {headers : this.config.headers}).subscribe(async data => {
      debugger;
      await new Promise(resolve => setTimeout(resolve, 2000))
      this.x_pleasewait.nativeElement.click();
    });
  }

  ClientProfile()
  {

  }

  InitUsers()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/user/client/" + this.clientId).subscribe(data => {
      let json = JSON.stringify(data);
      this.client.Users = <User[]>JSON.parse(json);
    });
  }

  OnSubmit(data) {
    debugger;
    var user = new User();
    user.ClientId = this.clientId
    user.Email = data.Email;
    user.IsAdmin = false
    this.x_user.nativeElement.click()
    this.i_pleasewait.nativeElement.click()
    debugger;
    let json = JSON.stringify(user);
    this.httpClient.post(this.config.REST_API_SERVICE + "/user/client", json, {headers : this.config.headers}).subscribe(async data => {
      debugger;
      await new Promise(resolve => setTimeout(resolve, 2000))
      this.x_pleasewait.nativeElement.click();
      this.client.Users = undefined
      this.InitUsers()
    });
  }

  OnLogoChanged(event)
  {
    debugger
    let files = event.target.files;
    this.imageConverter.ConvertToBase64(files);
  }

  OnSubmitClient(data)
  {
    debugger
    if(this.imageConverter.base64String)
      this.client.Logo = this.imageConverter.base64String
    this.client.Name = data.Name
    this.client.Email = data.Email
    this.client.Contact = data.Contact
    this.client.Location = data.Location

    let json = JSON.stringify(this.client)
    this.httpClient.post(this.config.REST_API_SERVICE + "/clients/", json, {headers: this.config.headers}).subscribe(data => {
      debugger;
      this.x_client.nativeElement.click()
    })
  }
}
