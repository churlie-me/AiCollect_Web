import { Component, Injectable } from '@angular/core';
import { User } from 'src/models/User';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/services/authentication.service';
import { RoutingService } from 'src/services/routing.service';
import { Client } from 'src/models/Client';

@Component({
  selector: 'app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class AppNavComponent {
  User: User = new User()
  Id: number
  Client: Client
  constructor(public router: Router, public routing: RoutingService, private activatedRoute: ActivatedRoute, public authentication: AuthenticationService) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.Id = params['Id']
    });

    let json = sessionStorage.getItem("client");
    if(json)
      this.Client = <Client>JSON.parse(json);
  }
}
