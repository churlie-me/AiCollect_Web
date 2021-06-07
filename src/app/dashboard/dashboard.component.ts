import { Component } from '@angular/core';
import { User } from 'src/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  User:User;

  constructor(public router : Router)
  {

  }

  ngOnInit()
  {
    var _userJson = sessionStorage.getItem("user");
    if(_userJson != null)
    {
      this.User = <User>JSON.parse(_userJson);
      if(this.User == undefined)
        this.router.navigate(['/']);
    }
    else
      this.router.navigate(['/']);
  }
}
