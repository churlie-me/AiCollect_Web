import { User } from "src/models/User";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Config } from "src/settings/config";
import { HttpClient } from "@angular/common/http";
import { Credentials } from "src/models/Credentials";
import { Client } from "src/models/Client";

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    public User : User;
    public FailedAuthentication: boolean = false;

    public constructor(private router : Router, private config: Config, private httpClient: HttpClient)
    {
        this.User = this.getUser();
    }

    ngOnInit() {

    }

    getUser()
    {
        var _userJson = sessionStorage.getItem("user")
        if (_userJson != null)
            return <User>JSON.parse(_userJson)
        else
            return null;
    }

    async ForgotPassword(user) : Promise<boolean>
    {
      this.httpClient.post(this.config.REST_API_SERVICE + "/user/password/forgot/", user, {headers : this.config.headers}).subscribe(async data => {
        return (<Boolean>JSON.parse(JSON.stringify(data)))
      });

      return false;
    }

    Logout()
    {
        sessionStorage.clear();
        this.User = undefined;

        this.router.navigate(['signin'])
    }

    Users()
    {
        this.router.navigate(['users'])
    }
}
