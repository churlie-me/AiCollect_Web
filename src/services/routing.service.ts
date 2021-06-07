import { User } from "src/models/User";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Config } from "src/settings/config";
import { HttpClient } from "@angular/common/http";
import { Credentials } from "src/models/Credentials";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root',
})
export class RoutingService {
    public User : User;
    public FailedAuthentication: boolean = false;

    public constructor(private router : Router, private config: Config, private authentication: AuthenticationService )
    {

    }
    
    DashboardClicked()
    {
        this.router.navigate(['dashboard']);
    }

    ClientClicked()
    {
        this.router.navigate(['client'], { queryParams: {Id: this.authentication.User.ClientId}})
    }

    ClientsClicked()
    {
        debugger
        this.router.navigate(['clients']);
    }

    ConfigurationsClicked()
    {
        this.router.navigate(['configurations'], { queryParams: {Id: this.authentication.User.ClientId}});
    }

    UsersClicked()
    {
        this.router.navigate(['users'], { queryParams: {Id: this.authentication.User.ClientId}});
    }

    TemplatesClicked()
    {
        this.router.navigate(['templates']);
    }

    BillingClicked()
    {
        if(this.authentication.User.ClientId == undefined)
        this.router.navigate(['billing']);
        else
        this.router.navigate(['billing'], { queryParams: {Id: this.authentication.User.ClientId}});
    }

    PackagesClicked()
    {
        this.router.navigate(['packages']);
    }
}
