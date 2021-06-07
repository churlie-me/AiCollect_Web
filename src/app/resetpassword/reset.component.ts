import { Component, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import{ Location } from '@angular/common'
import { AuthenticationService } from 'src/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/settings/config';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
})
@Injectable({
  providedIn: 'root',
})
export class ResetComponent {
  public User : User = new User()
  private email : string
  public isBusy : boolean = false
  FailedAuthentication : Boolean = false
  constructor(public location: Location, private router: Router, public authentication: AuthenticationService, public httpClient: HttpClient, public config: Config, private activatedRoute: ActivatedRoute)
  {

  }

  ngOnInit()
  {
    debugger
    this.activatedRoute.queryParams.subscribe(params => {
      this.User.Key = <string>params['id']
      this.User.Usercode = <string>params['code']
      this.User.Email = <string>params['email']
    });
  }

  async OnSubmit(passwords)
  {
    debugger
    if(passwords.Password == passwords.CPassword)
    {
      this.isBusy = true
      debugger;
      this.User.Password = passwords.Password
      this.httpClient.post(this.config.REST_API_SERVICE + "/user/password/reset/", this.User, {headers : this.config.headers}).subscribe(async data => {
        if (<boolean>JSON.parse(JSON.stringify(data)))
        {
          this.isBusy = false
          this.router.navigate(['signin'])
        }
        else
        {
          this.isBusy = false
          alert("Something went wrong, please try again")
          this.router.navigate(['forgotpassword'])
        }
      });
    }
    else
      this.authentication.FailedAuthentication = true
  }
}
