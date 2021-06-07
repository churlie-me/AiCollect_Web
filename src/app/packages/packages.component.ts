import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/models/User';
import { Config } from 'src/settings/config';
import { Billing } from 'src/models/Billing';
import { Guid } from 'guid-typescript';
import { Package } from 'src/models/Package';
import { Plan } from 'src/enums/enums';

@Component({
  selector: 'app-packages',
  templateUrl: './packages.component.html'
})
export class PackagesComponent {
  public packages: Array<Package>;
  keys: any[]
  plans = Plan
  package: Package

  constructor(private httpClient: HttpClient, private config: Config, private router: Router) { }

  ngOnInit() {
    this.keys = Object.keys(this.plans).filter(k => !isNaN(Number(k)))
    this.httpClient.get(this.config.REST_API_SERVICE + "/package").subscribe(data => {
      debugger;
      let json = JSON.stringify(data);
      this.packages = <Array<Package>>JSON.parse(json);
    });
  }

  InitPackage()
  {
    this.package = new Package()
  }

  EditPackage(key)
  {
    debugger
    this.package = this.packages.find(x => x.Key == key.currentTarget.id.toString())
  }

  OnSubmit(data) {
    debugger
    let _package = new Package()
    if(!_package.Key)
      _package.Key = Guid.create().toString()
    _package.Name = data.Name
    _package.Plan = data.Plan
    _package.Price = data.Price

    debugger;
    let json = JSON.stringify(_package);
    
    this.httpClient.post(this.config.REST_API_SERVICE + "/package", json, {headers: this.config.headers}).subscribe(data => {
      debugger;
      this.ngOnInit()
    });
  }
}
