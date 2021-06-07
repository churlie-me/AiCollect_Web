import { Router, ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "src/models/Category";
import { Location } from '@angular/common';
import { Template } from "src/models/template";
import { TemplateType } from "src/enums/enums";
import { Config } from "src/settings/config";

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html'
})
export class OptionsComponent {
  templates: Template[] = []
  _templates: Template[] = []
  _template: Template
  categories: Category[] = []
  Id: string
  _action: string
  Configuration_Id: string

  constructor(private httpClient: HttpClient, private activatedRoute: ActivatedRoute, private config: Config, private location: Location) {  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      this._action = params['action']
      this.Configuration_Id = params['Configuration_Id']
    })
    debugger
    this.InitCategories()
    this.httpClient.get(this.config.REST_API_SERVICE + "/template/").subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.templates = <Template[]>JSON.parse(json)
      this._templates = this.templates

      switch(this._action)
      {
        case 'questionaire':
          this.templates = this.templates.filter(x => x.TemplateType == TemplateType.Questionaire)
          break;
        case 'certification':
          this.templates = this.templates.filter(x => x.TemplateType == TemplateType.Certification)
          break;
        case 'inspection':
          this.templates = this.templates.filter(x => x.TemplateType == TemplateType.FieldInspection)
          break;
      }

      
    })
  }

  InitCategories()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/category/templates").subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.categories = <Category[]>JSON.parse(json)
    });
  }

  OnCancel()
  {
    this.location.back();
  }

  OnTemplateSelected(event)
  {
    debugger
    this._template = this._templates.find(y => y.OID == event.currentTarget.id.toString())
  }

  FilterByCategory(category: Category)
  {
    debugger
    this.templates = this._templates.filter(x => x.Category.Key == category.Key)
    return this.templates
  }
}
