import { Component, Injectable } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "site-footer",
  templateUrl: "./site-footer.component.html",
  styleUrls: ["./site-footer.scss"],
})
@Injectable({
  providedIn: "root",
})
export class SiteFooterComponent {
  constructor(public location: Location, public router: Router) {}

  ngOnInit() {}
}
