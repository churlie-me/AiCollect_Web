import { Component, Injectable, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/models/User';
import{ Location } from '@angular/common'
import { AuthenticationService } from 'src/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/settings/config';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
@Injectable({
  providedIn: 'root',
})
export class RegistrationComponent {
  public Id: string
  public user: User;
  public IsEnabled: boolean = false
  @ViewChild("i_confirmed") i_confirmed: any
  @ViewChild("pleasewait") pleasewait: any
  @ViewChild("x_confirmed") x_confirmed: any
  @ViewChild("x_pleasewait") x_pleasewait: any
  constructor(private location : Location, private router : Router, private authentication : AuthenticationService,
    private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private config: Config)
  {

  }

  ngOnInit()
  {
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      this.Id = params['Id']
    })

    debugger;
    this.httpClient.get(this.config.REST_API_SERVICE + "/user/"+ this.Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.user = <User>JSON.parse(json)

      //Account has already been set up
      if(this.user.UserName)
        this.router.navigate(['/signin'])
    }, error => {
      alert(error + "This account does not exist")
      this.router.navigate(['/'])
    })
  }

  OnAccountCompleted(data)
  {
    debugger;
    this.pleasewait.nativeElement.click()
    this.user.Firstname = data.Firstname
    this.user.Lastname = data.Lastname
    this.user.Password = data.Password
    this.user.UserName = data.UserName

    let json = JSON.stringify(this.user)
    this.httpClient.post(this.config.REST_API_SERVICE + "/user/client", json, {headers : this.config.headers}).subscribe(data => {
      debugger;
      this.x_pleasewait.nativeElement.click()
      if(<boolean>JSON.parse(JSON.stringify(data)))
        this.i_confirmed.nativeElement.click()
      else
        alert("Something went wrong, please try again or contact our support team for help")
    });
  }

  async OnSignIn()
  {
    this.x_confirmed.nativeElement.click();
    await new Promise(resolve => setTimeout(resolve, 500))

    this.router.navigate(['/signin'])
  }
}
