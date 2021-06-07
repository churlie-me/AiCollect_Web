import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "src/models/User";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.css"],
})
export class MainComponent {
  User: User;
  constructor(private router: Router) {}

  ngOnInit() {
    debugger;
    var _userJson = sessionStorage.getItem("user");
    if (_userJson != null) this.User = <User>JSON.parse(_userJson);
    if (this.User != undefined) this.router.navigate(["dashboard"]);
  }
}
