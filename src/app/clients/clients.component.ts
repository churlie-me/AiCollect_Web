import { Component, ViewChild } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Client } from 'src/models/Client';
import { User } from 'src/models/User';
import { Config } from 'src/settings/config';
import { Package } from 'src/models/Package';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-clients-component',
  templateUrl: './clients.component.html'
})
export class ClientsComponent {
  public clients: Array<Client>
  public client: Client
  public packages: Package[]
  public user: User
  @ViewChild("x_client") x_client: any
  @ViewChild("x_delete") x_delete: any

  constructor(private httpClient: HttpClient, private router: Router, private config: Config) {}

  ngOnInit() {
    this.httpClient.get(this.config.REST_API_SERVICE + "/package").subscribe(data => {
      debugger;
      let json = JSON.stringify(data);
      this.packages = <Package[]>JSON.parse(json);
    });

    this.InitClients()
  }

  AddClient()
  {
    debugger
    this.client = new Client()
    this.client.Key = Guid.create().toString()
    this.client.Users = []
    this.user = new User()
    this.client.Package = new Package();
    this.client.Package.OID = undefined
  }

  InitClients()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/clients").subscribe(data => {
      debugger;
      let json = JSON.stringify(data);
      this.clients = JSON.parse(json);
    });
  }

  InitClient(key)
  {
    debugger
    this.client = this.clients.find(x => x.OID == key.currentTarget.id.toString())
    this.user = this.client.Users[0]

    if(this.client.Package == undefined)
    {
      this.client.Package = new Package();
    }
  }

  OnConfirmDelete()
  {
    this.x_delete.nativeElement.click()
    this.client.Deleted = true;
    this.Save()
  }

  onClickSubmit(data) {
    debugger
    this.client.Name = data.Name
    this.client.Email = data.Email
    this.client.Contact = data.Contact
    this.client.Location = data.Location
    this.client.Package = this.packages.find(x => x.OID == data.Package);
  
    if(this.user.Email == undefined)
      this.user.Email = data.AdminEmail
      
    this.user.IsAdmin = true

    if(this.client.Users.length == 0)
      this.client.Users.push(this.user);

    this.Save()
  }

  Save()
  {
    debugger
    let json = JSON.stringify(this.client)
    this.httpClient.post(this.config.REST_API_SERVICE + "/clients/", json, {headers: this.config.headers}).subscribe(data => {
      debugger;
      this.x_client.nativeElement.click()
      this.InitClients()
    })
  }
}
