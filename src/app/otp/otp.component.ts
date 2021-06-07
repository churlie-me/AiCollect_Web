import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import{ Location } from '@angular/common'
import { AuthenticationService } from 'src/services/authentication.service';
import { Credentials } from 'src/models/Credentials';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/settings/config';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
})
@Injectable({
  providedIn: 'root',
})
export class OTPComponent {
  public User : User = new User()
  private email : string
  isBusy : boolean = false
  FailedAuthentication : Boolean = false
  code : string = ""
  @ViewChild('code0') code0: ElementRef;
  @ViewChild('code1') code1: ElementRef;
  @ViewChild('code2') code2: ElementRef;
  @ViewChild('code3') code3: ElementRef;
  @ViewChild('code4') code4: ElementRef;
  constructor(public location: Location, private router: Router, public authentication: AuthenticationService, public httpClient: HttpClient, public config: Config, private activatedRoute: ActivatedRoute)
  {

  }

  ngOnInit()
  {
    this.activatedRoute.queryParams.subscribe(params => {
      this.User.Email = <string>params['email']
    });
  }

  async CodeUp(event : any)
  {
    debugger
    this.code += event.target.value
    if(this.code.length == 5)
    {
      this.isBusy = true
      this.code0.nativeElement.disabled = false
      this.code4.nativeElement.disabled = false
      this.code3.nativeElement.disabled = false
      this.code2.nativeElement.disabled = false
      this.code1.nativeElement.disabled = false
      this.User.Usercode = this.code
      this.isBusy = false

      this.httpClient.post(this.config.REST_API_SERVICE + "/user/verify/", this.User, {headers : this.config.headers}).subscribe(async data => {
        this.User = <User>JSON.parse(JSON.stringify(data))
        if(this.User)
          this.router.navigate(['resetpassword'], { queryParams: { id: this.User.Key, code : this.User.Usercode, email : this.User.Email } })
        else
          alert("You've entered a wrong verification code")
      });
    }
    else if(this.code.length == 4)
    {
      this.code4.nativeElement.disabled = false
      this.code4.nativeElement.focus()
    }
    else if(this.code.length == 3)
    {
      this.code3.nativeElement.disabled = false
      this.code3.nativeElement.focus()
    }
    else if(this.code.length == 2)
    {
      this.code2.nativeElement.disabled = false
      this.code2.nativeElement.focus()
    }
    else if(this.code.length == 1)
    {
      this.code1.nativeElement.disabled = false
      this.code1.nativeElement.focus()
    }
  }

  CodeDown(event)
  {
    this.code.slice(this.code.length)
    /*switch(this.code.length)
    {
      case 1:
        this.code1.nativeElement.disabled = true
        this.code0.nativeElement.focus()
        break;
      case 2:
        this.code2.nativeElement.disabled = true
        this.code1.nativeElement.focus()
        break;
      case 3:
        this.code3.nativeElement.disabled = true
        this.code2.nativeElement.focus()
        break;
      case 4:
        this.code4.nativeElement.disabled = true
        this.code3.nativeElement.focus()
        break;
    }*/
  }

  async Resend()
  {
    debugger
    await this.authentication.ForgotPassword(this.User)
  }

  OnValidateAccount(data)
  {
    this.isBusy = true
    debugger;
    this.authentication.ForgotPassword(data);
  }
}
