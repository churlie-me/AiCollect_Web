import { Component, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/User';
import { Config } from 'src/settings/config';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UserComponent {
  public users: Array<User>;
  public user: User
  @ViewChild("x_pleasewait") public x_pleasewait: any
  @ViewChild("i_pleasewait") public i_pleasewait: any
  @ViewChild("x_confirmed") public x_confirmed: any
  @ViewChild("x_user") public x_user: any
  public ClientId: string

  constructor(private httpClient: HttpClient, private config: Config, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      this.ClientId = params["clientId"];

      if(this.ClientId)
      {
        this.httpClient.get(this.config.REST_API_SERVICE + "/user/client/" + this.ClientId).subscribe(data => {
          let json = JSON.stringify(data);
          this.users = <User[]>JSON.parse(json);
        });
      }
      else
        this.httpClient.get(this.config.REST_API_SERVICE + "/user/admin/").subscribe(data => {
          debugger;
          let json = JSON.stringify(data);
          this.users = JSON.parse(json);
        });
    })
  }

  async OnSubmit(data) {
    debugger;
    var user = new User();
    user.Email = data.Email;
    user.IsAdmin = (this.ClientId)? false : true;
    user.ClientId = (this.ClientId)? parseInt(this.ClientId) : undefined

    debugger;
    let json = JSON.stringify(user);
    this.x_user.nativeElement.click()
    await new Promise(resolve => setTimeout(resolve, 500))
    this.Start()
    this.httpClient.post(this.config.REST_API_SERVICE + "/user", json, {headers: this.config.headers}).subscribe(data => {
      debugger;
      this.Stop()
      this.ngOnInit();
    });
  }

  InitUser(event)
  {
    debugger
    if(event.currentTarget.id != "")
      this.user = this.users.find(u => u.OID == event.currentTarget.id.toString())
    else
      this.user = new User()
  }

  DeleteUser()
  {
    this.Start()
    this.httpClient.delete(this.config.REST_API_SERVICE + "/user/"+ this.user.OID, {headers: this.config.headers}).subscribe(data => {
      debugger;
      this.x_confirmed.nativeElement.click()
      this.Stop()
      this.ngOnInit();
    });
  }

  Start()
    {
        debugger
        this.i_pleasewait.nativeElement.click()
    }

    async Stop()
    {
        debugger
        await new Promise(resolve => setTimeout(resolve, 500))
        this.x_pleasewait.nativeElement.click()
    }
}
