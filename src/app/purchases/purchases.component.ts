import { Component, ViewChild } from '@angular/core';
//import { HttpClient } from 'selenium-webdriver/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from 'src/models/Client';
import { User } from 'src/models/User';
import { Configuration } from 'src/models/Configuration';
import { ConfigurationVersion } from 'src/models/ConfigurationVersion';
import { Questionaire } from 'src/models/Questionaire';
import { FieldInspection } from 'src/models/FieldInspection';
import { Training } from 'src/models/Training';
import { Purchase } from 'src/models/Purchase';
import { EnumList } from 'src/models/EnumList';
import { EnumValue } from 'src/models/EnumValue';
import { Config } from 'src/settings/config';
import { EnumListTypes } from 'src/enums/enums';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html'
})
export class PurchasesComponent {
  currentCount = 0
  purchases: Purchase[]
  configuration_Id :string
  Id: string
  configuration : Configuration
  products: EnumList
  prices: EnumList
  regions: EnumList
  @ViewChild("x_region") x_region: any

  constructor(private httpClient: HttpClient, private router: Router, private activatedRoute: ActivatedRoute, private config : Config) {  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      this.configuration_Id = params['configuration_Id']
    })
    debugger
    this.httpClient.get(this.config.REST_API_SERVICE + "/configuration/" + this.configuration_Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.configuration = <Configuration>JSON.parse(json)

      //Regions
      this.InitRegions()

      //Products
      this.InitProducts()

      //Prices
      this.InitPrices()
    });

    this.httpClient.get(this.config.REST_API_SERVICE + "/purchase/configuration/" + this.configuration_Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.purchases = <Purchase[]>JSON.parse(json)
    })
  }

  InitRegions()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/enumlist/regions/configuration/" + this.configuration_Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.regions = <EnumList>JSON.parse(json)
    })
  }

  InitProducts()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/enumlist/products/configuration/" + this.configuration_Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.products = <EnumList>JSON.parse(json)
    }) 
  }

  InitPrices()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/enumlist/prices/configuration/" + this.configuration_Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.prices = <EnumList>JSON.parse(json)
    }) 
  }

  OnRegionSubmitted(data)
  {
    debugger
    let value = new EnumValue()
    if(this.regions.EnumValues.length == 0)
      value.Code = 0
    else
      value.Code = this.regions.EnumValues[this.regions.EnumValues.length - 1].Code + 1

    value.Description = data.Description
    this.regions.Name = "Regions"
    this.regions.ConfigurationId =  Number.parseInt(this.configuration_Id)
    this.regions.EnumListType = EnumListTypes.Region
    this.regions.EnumValues.push(value)
    this.httpClient.post(this.config.REST_API_SERVICE + "/enumlist/", JSON.stringify(this.regions), {headers: this.config.headers}).subscribe(data => {
      debugger
      this.x_region.nativeElement.click()
      this.InitRegions()
    })
  }

  OnPriceSubmitted(data)
  {
    debugger
    let value = new EnumValue()
    value.Code = data.Code
    value.Description = data.Description
    this.prices.Name = "Prices"
    this.prices.ConfigurationId =  Number.parseInt(this.configuration_Id)
    this.prices.EnumListType = EnumListTypes.Price
    this.prices.EnumValues.push(value)
    this.httpClient.post(this.config.REST_API_SERVICE + "/enumlist/", JSON.stringify(this.prices), {headers: this.config.headers}).subscribe(data => {
      debugger
      this.x_region.nativeElement.click()
      this.InitPrices()
    })
  }

  OnProductSubmitted(data)
  {
    debugger
    let value = new EnumValue()
    if(this.products.EnumValues.length == 0)
      value.Code = 0
    else
      value.Code = this.regions.EnumValues[this.products.EnumValues.length - 1].Code + 1

    value.Description = data.Description
    this.products.Name = "Products"
    this.products.ConfigurationId =  Number.parseInt(this.configuration_Id)
    this.products.EnumListType = EnumListTypes.Product
    this.products.EnumValues.push(value)
    this.httpClient.post(this.config.REST_API_SERVICE + "/enumlist/", JSON.stringify(this.products), {headers: this.config.headers}).subscribe(data => {
      debugger
      this.x_region.nativeElement.click()
      this.InitProducts()
    })
  }
}
