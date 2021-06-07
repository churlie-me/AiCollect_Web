import { Component, Injectable, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import{ Location } from '@angular/common'
import { AuthenticationService } from 'src/services/authentication.service';
import { Credentials } from 'src/models/Credentials';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/settings/config';
import { Client } from 'src/models/Client';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
@Injectable({
  providedIn: 'root',
})
export class SignInComponent {
  public User : User
  isBusy : boolean = false
  FailedAuthentication : Boolean = false
  @ViewChild("infobox") infobox : ElementRef
  constructor(public location: Location, private router: Router, public authentication: AuthenticationService, public httpClient: HttpClient, public config: Config)
  {

  }

  ngOnInit()
  {

  }

  OnUserAuthentication(data)
  {
    this.isBusy = true
    debugger;
    var credentials =  new Credentials();
        credentials.Username = data.UserName
        credentials.Password = data.Password
        /*let json = JSON.stringify(credentials)
        this.httpClient.post(this.config.REST_API_SERVICE + "/user/authentication", json, {headers : this.config.headers}).subscribe(data => {
            debugger;
            this.User = <User>JSON.parse(JSON.stringify(data))

            if(this.User.UserName != null)
            {
              this.authentication.User = this.User
                sessionStorage.setItem('user', JSON.stringify(this.User))
                debugger
                if(this.User.ClientId == undefined)
                  this.router.navigate(['dashboard']);
                else
                  this.router.navigate(['client'], { queryParams: {Id: this.User.ClientId}})
            }
            else
            {
                this.FailedAuthentication = true
                this.User = undefined
            }

            return this.User
        });*/

        this.UserAuthentication(credentials);
  }

  public UserAuthentication(credentials: Credentials)
    {
        debugger
        let json = JSON.stringify(credentials)
        this.httpClient.post(this.config.REST_API_SERVICE + "/user/authentication", json, {headers : this.config.headers}).subscribe(async data => {
            debugger;
            this.isBusy = false
            this.User = <User>JSON.parse(JSON.stringify(data))

            if(this.User.UserName != null)
            {
              if(!this.User.Enabled)
              {
                this.User = null
                await new Promise(resolve => setTimeout(resolve, 2000))
                this.infobox.nativeElement.click()
                return
              }

              sessionStorage.setItem('user', JSON.stringify(this.User))
              if(this.User.ClientId == undefined)
                  this.router.navigate(['/dashboard']);
              else
              {
                  this.router.navigate(['/client'], { queryParams: {Id: this.User.ClientId}})
              }
              this.authentication.User = this.User
              await new Promise(resolve => setTimeout(resolve, 500))
              location.reload()
            }
            else
            {
                this.authentication.FailedAuthentication = true
                this.User = undefined
            }
        });
    }
}
