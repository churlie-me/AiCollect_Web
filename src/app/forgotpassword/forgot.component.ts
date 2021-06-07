import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import{ Location } from '@angular/common'
import { AuthenticationService } from 'src/services/authentication.service';
import { Credentials } from 'src/models/Credentials';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/settings/config';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
})
@Injectable({
  providedIn: 'root',
})
export class ForgotComponent {
  public User : User = new User()
  private email : string
  isBusy : boolean = false
  FailedAuthentication : Boolean = false
  constructor(public location: Location, private router: Router, public authentication: AuthenticationService, public httpClient: HttpClient, public config: Config)
  {

  }

  ngOnInit()
  {

  }

  async OnSubmitMail()
  {
    debugger
    this.isBusy = true
    debugger;
    this.httpClient.post(this.config.REST_API_SERVICE + "/user/password/forgot/", this.User, {headers : this.config.headers}).subscribe(async data => {
      this.isBusy = false
      if(<Boolean>JSON.parse(JSON.stringify(data)))
      {
        this.router.navigate(['otp'], { queryParams: {email: this.User.Email}})
      }
      else
        alert("This email does not exist in our databases")
    });
  }
}
