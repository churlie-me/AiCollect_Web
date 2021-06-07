import { Region } from './../../models/Region';
import { Component, ViewChild, Renderer2, Type, Injectable } from '@angular/core';
import { Guid } from "guid-typescript";
import { Questionaire } from 'src/models/Questionaire';
import { Section } from 'src/models/Section';
import { Question } from 'src/models/Question';
import { DataTypes, QuestionTypes, CertificationTypes, Statuses, EnumListTypes, TemplateType, DataCollectionObectTypes } from 'src/enums/enums';
import { EnumList } from 'src/models/EnumList';
import { EnumValue } from 'src/models/EnumValue';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Certification } from 'src/models/Certification';
import { FieldInspection } from 'src/models/FieldInspection';
import { Location } from '@angular/common';
import { Config } from 'src/settings/config';
import { SkipCondition } from 'src/models/SkipCondition';
import { Category } from 'src/models/Category';
import { Template } from 'src/models/template';
import { SubSection } from 'src/models/SubSection';
import { Dependency } from 'src/models/Dependency';
import { DataCollectionObject } from 'src/models/DataCollectionObject';
import { Target } from 'src/models/Target';
import { User } from 'src/models/User';
import { AuthenticationService } from 'src/services/authentication.service';
declare let $ : any;

@Component({
  selector: 'app-architect',
  templateUrl: './architect.component.html',
})
@Injectable({
  providedIn: 'root',
})
export class ArchitectComponent {
  status : number
  Configuration_Id : string
  public Questionaire: Questionaire
  Template: Template
  Categories: Category[]
  Category: Category
  Region : Region
  Section: Section
  SubSection: SubSection
  TargetSection: Section
  TargetSubSection: SubSection
  Question: Question
  @ViewChild('x_section') x_section: any
  @ViewChild('x_question') x_question: any
  @ViewChild('x_enumeration') x_enumeration: any
  @ViewChild('x_delete') x_delete: any
  @ViewChild('accordion') accordion: any
  @ViewChild('discard') discard: any
  @ViewChild('init_questionaire') init_questionaire: any
  @ViewChild('init_certification') init_certification: any
  @ViewChild('x_questionaire') x_questionaire: any
  @ViewChild('x_certification') x_certification: any
  @ViewChild('x_discard') x_discard: any
  @ViewChild('x_inspection') x_inspection: any
  @ViewChild('x_category') x_category: any
  @ViewChild('x_region') x_region: any
  @ViewChild('init_template') init_template: any
  @ViewChild('x_template') x_template: any
  @ViewChild('x_sub_section') x_sub_section: any
  @ViewChild('x_dependency') x_dependency: any
  @ViewChild("x_pleasewait") x_pleasewait: any
  @ViewChild("pleasewait") pleasewait: any
  IsSubSectionBound : boolean = false
  keys: any[]
  certificationKeys: any[]
  typekeys: any[]
  Id: number
  templateTypes = TemplateType
  dataTypes = DataTypes
  certificationTypes = CertificationTypes
  dataCollectionObectTypes = DataCollectionObectTypes
  dataCollectionObectTypeKeys: any[]
  section_active = "2px solid rgb(116, 96, 238)"
  action : string
  Certification : Certification
  Inspection : FieldInspection
  Sections: Section[]
  Condition: SkipCondition
  template_id: string
  item_delete: string
  enumValue: EnumValue
  Depedencies: Dependency[]
  Dependency: Dependency
  _sectionKey: string
  User: User
  constructor(private activatedRoute: ActivatedRoute, private httpClient : HttpClient, private location : Location, private config: Config, private authentication: AuthenticationService) {

  }

  ngAfterViewInit()
  {
    debugger
    this.activatedRoute.queryParams.subscribe(params => {
      debugger
      this.Id = params['Id']
      this.Configuration_Id = params['Configuration_Id']
      this.action = params['action']
      this.template_id = params['template_id']

      this.InitCategories()

      if(this.Id != undefined)
        switch(this.action)
        {
          case 'questionaire':
            this.httpClient.get(this.config.REST_API_SERVICE + "/questionaire/" + this.Id).subscribe(data => {
              debugger
              let json = JSON.stringify(data)
              this.Questionaire = JSON.parse(json)
              this.Sections = this.Questionaire.Sections
              if(!this.Questionaire.Regions)
                this.Questionaire.Regions = []
            });
            break
          case 'inspection':
            this.httpClient.get(this.config.REST_API_SERVICE + "/inspection/" + this.Id).subscribe(data => {
              debugger
              let json = JSON.stringify(data)
              this.Inspection = JSON.parse(json)
              this.Sections = this.Inspection.Sections
            });
            break
          case 'certification':
            this.httpClient.get(this.config.REST_API_SERVICE + "/certification/" + this.Id).subscribe(data => {
              debugger
              let json = JSON.stringify(data)
              this.Certification = JSON.parse(json)
              this.Sections = this.Certification.Sections
            });
            break
          case 'template':
            this.httpClient.get(this.config.REST_API_SERVICE + "/template/" + this.Id).subscribe(data => {
              debugger
              let json = JSON.stringify(data)
              this.Template = JSON.parse(json)
              this.Sections = this.Template.Sections
            });
            break
        }
      else
      {
        switch(this.action)
        {
          case 'questionaire':
            this.Questionaire = new Questionaire()
            this.Questionaire.Categories = []
            this.Questionaire.Regions = []
            this.init_questionaire.nativeElement.click()
            if(this.template_id)
              this.InitTemplate(this.template_id)
            break
          case 'certification':
            this.init_certification.nativeElement.click()
            if(this.template_id)
              this.InitTemplate(this.template_id)
            break
          case 'inspection':
            this.OnCreateInspection()
            break
          case 'template':
            this.Template = new Template()
            this.Template.Category = new Category()
            this.init_template.nativeElement.click()
            break
        }
        this.status = -1
      }
    });
  }

  ngOnInit() {

    debugger
    //this.Questionaire = JSON.parse(_json)
    //this.Sections = this.Questionaire.Sections
    this.keys = Object.keys(this.dataTypes).filter(k => !isNaN(Number(k)))

    //Certification Types
    this.certificationKeys = Object.keys(this.certificationTypes).filter(k => !isNaN(Number(k)))
    //Template Types
    this.typekeys = Object.keys(this.templateTypes).filter(k => !isNaN(Number(k)))

    //dataCollectionObect Types
    this.dataCollectionObectTypeKeys = Object.keys(this.dataCollectionObectTypes).filter(k => !isNaN(Number(k)))
  }

  InitTemplate(Id: string)
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/template/" + Id).subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.Template = JSON.parse(json)
      this.Sections = this.Template.Sections

      //Re-assign guids on all items
      this.Sections.forEach(s => {
        s.Key = Guid.create().toString()
        s.Questions.forEach(q => {
          q.Key = Guid.create().toString()
          q.Conditions.forEach(c => c.Key == Guid.create().toString())
          if(q.EnumList != undefined)
          {
            q.EnumList.Key = Guid.create().toString()
            q.EnumList.EnumValues.forEach(e => e.Key = Guid.create().toString())
          }
        })
        s.SubSections.forEach(sub => {
          sub.Key = Guid.create().toString()
          sub.Questions.forEach(q => {
            q.Key = Guid.create().toString()
            q.Conditions.forEach(c => c.Key == Guid.create().toString())
            if(q.EnumList != undefined)
            {
              q.EnumList.Key = Guid.create().toString()
              q.EnumList.EnumValues.forEach(e => e.Key = Guid.create().toString())
            }
          })
        })
      })
    });
  }

  InitCategories()
  {
    this.httpClient.get(this.config.REST_API_SERVICE + "/category/").subscribe(data => {
      debugger
      let json = JSON.stringify(data)
      this.Categories = <Category[]>JSON.parse(json)
    });
  }

  OnCreateSection(data) {
    debugger
    this.status = -1
    this.Section.Name = data.SName
    this.Section.Description = data.SDesc

    if(this.Questionaire != undefined)
      this.Section.QuestionaireKey = this.Section.Key

    if(this.Certification != undefined)
      this.Section.CertificationKey = this.Section.Key

    if(this.Inspection != undefined)
      this.Section.InspectionKey = this.Section.Key

    if(this.Sections == undefined)
      this.Sections = []

    if(this.Sections.filter(x => x.Key == this.Section.Key).length == 0)
      this.Sections.push(this.Section)

    this.x_section.nativeElement.click()
  }

  NotifyChanges()
  {
    if(this.status == -1)
      this.discard.nativeElement.click()
    else
      this.location.back();
  }

  OnCreateSubSection(data)
  {
    debugger
    this.status = -1
    let subsection_key = this.SubSection.Key;
    let sections = this.Sections.map(function(section){

      if(section.SubSections)
        if(section.SubSections.find(x => x.Key == subsection_key) != undefined)
          return section;
     });
    this.SubSection.Name = data.Name

    if(sections.find(y => y != undefined) != undefined)
      this.Section = sections.find(y => y != undefined)

    if(this.Section.SubSections == undefined)
      this.Section.SubSections = []

    if(this.Section.SubSections.filter(x => x.Key == this.SubSection.Key).length == 0)
      this.Section.SubSections.push(this.SubSection)

    this.x_sub_section.nativeElement.click()
  }

  OnSelectSection(key) {
    debugger
      if(!this.Section)
      {
        this.IsSubSectionBound = false
        this.Section = this.Sections.find(x => x.Key == key.currentTarget.id.toString())
        this.Section.IsSelected = true;
        //Deactivate all other sections
        for (let i = 0; i < key.currentTarget.parentNode.children.length; i++) {
          let node = key.currentTarget.parentNode.children[i]
          node.style.border = ""
          debugger
        }

        key.currentTarget.style.border = this.section_active

        //Clear any sub sections
        this.Sections.map(function(section){
          if(section.SubSections)
            section.SubSections.forEach( x => x.IsSelected = false)
        });
      }
      else if(this.Section.IsSelected == false)
      {
        this.Section = undefined  //Section should not be selected while using a subsection
        for (let i = 0; i < key.currentTarget.parentNode.children.length; i++) {
          let node = key.currentTarget.parentNode.children[i]
          node.style.border = ""
          debugger
        }
      }
      else
      {
        this.IsSubSectionBound = false
        this.Section = this.Sections.find(x => x.Key == key.currentTarget.id.toString())

        //Deactivate all other sections
        for (let i = 0; i < key.currentTarget.parentNode.children.length; i++) {
          let node = key.currentTarget.parentNode.children[i]
          node.style.border = ""
          debugger
        }

        key.currentTarget.style.border = this.section_active

        //Clear any sub sections
        this.Sections.map(function(section){
          if(section.SubSections)
            section.SubSections.forEach( x => x.IsSelected = false)
        });
      }
  }

  OnSubSectionSelected(key)
  {
    debugger
    if (key.currentTarget.style.border != this.section_active)
      this.Sections.forEach(s => this.SetEssentials(s, key.currentTarget.id.toString()))

    for (let i = 0; i < key.currentTarget.parentNode.parentNode.parentNode.children.length; i++) {
      let cNode = key.currentTarget.parentNode.parentNode.parentNode.children[i]
      for(let j = 0; j < cNode.children.length; j++)

      debugger
    }

    if(this.SubSection != undefined)
      key.currentTarget.style.border = this.section_active

    this.IsSubSectionBound = true
  }

  SetEssentials(s: Section, k: string)
  {
    debugger
    let sub = s.SubSections.find(x => x.Key == k)
    if(sub != undefined)
    {
      this.SubSection = sub
    }
  }

  //Toggle section
  ToggleSection(e)
  {
    debugger
    var $_target =  $(e.currentTarget).parent().parent().parent().parent();
    var $_panelBody = $_target.find(".section-collapse");
    if($_panelBody){
      $_panelBody.collapse('toggle')
    }
  }

  ToggleSubSection(e)
  {
    debugger
    var $_target = $(e.currentTarget).parent().parent().parent().parent();
    var $_panelBody = $_target.find(".subsection-collapse");
    if($_panelBody){
      $_panelBody.collapse('toggle')
    }
  }

  //Questions
  Init_Question(key) {
    debugger;
    this.Condition = undefined
    this.TargetSection = undefined
    this.Dependency = undefined
    this.Question = new Question()
    this.Question.Deleted = false
    this.Question.Key = Guid.create().toString()
    this.Question.EnumList = new EnumList()
    this.Question.EnumList.EnumListType = EnumListTypes.Question
    this.Question.EnumList.EnumValues = []
    this.Question.Required = false;
    this.Question.QuestionType = parseInt(key.currentTarget.accessKey, 10)
    this.Question.DataType = parseInt(key.currentTarget.id, 10)
  }

  InitDependency(event)
  {
    this.item_delete = "dependency"
    debugger
    if(event === undefined)
    {
      this.Dependency = new Dependency()
      this.Dependency.Key = Guid.create().toString()
      this.Dependency.TargetObjectType = DataCollectionObectTypes.Question
    }
    else
    {
        this.Dependency = this.Question.Dependencies.find(x => x.Key == event.currentTarget.id.toString())
    }
  }

  OnConfirmDeleteDependency()
  {
    debugger
    this.status = -1
    this.Dependency.Deleted = true;
    this.x_delete.nativeElement.click()
  }

  OnSubmitDependency(data)
  {
    debugger;
    this.status = -1
    this.Dependency.QuestionKey = this.Question.Key
    this.Dependency.TargetObjectType = DataCollectionObectTypes.SubSection
    this.Dependency.TargetObjectKey = data.TargetObjectKey
    if(this.Question.Dependencies.find(x => x.Key == this.Dependency.Key) == undefined)
      this.Question.Dependencies.push(this.Dependency)

    //close modal
    this.x_dependency.nativeElement.click()
  }

  InitEnum(event)
  {
    debugger
    if(event === undefined)
    {
      this.enumValue = new EnumValue()
      this.enumValue.Key = Guid.create().toString()
      if(this.Question.EnumList.EnumValues.length == 0)
        this.enumValue.Code = 0
      else
        this.enumValue.Code = this.Question.EnumList.EnumValues[this.Question.EnumList.EnumValues.length - 1].Code + 1
    }
    else
    {
        this.enumValue = this.Question.EnumList.EnumValues.find(x => x.Key == event.currentTarget.id.toString())
    }
  }

  OnSubmitEnumeration(data) {
    debugger;
    this.status = -1
    this.enumValue.Description = data.option
    if(this.Question.EnumList.EnumValues.find(x => x.Key == this.enumValue.Key) == undefined)
      this.Question.EnumList.EnumValues.push(this.enumValue)

    //close modal
    this.x_enumeration.nativeElement.click()
  }

  TargetSectionChanged(value)
  {
    debugger
    this.status = -1
    this.TargetSection = this.Sections.find(x => x.Key == value)
    if(this.TargetSection != undefined)
      this.Condition.AttributeKey = this.TargetSection.Key
  }

  TargetSubSectionChanged(value)
  {
    debugger
    this.status = -1
    if(this.TargetSection != undefined)
      this.Condition.AttributeKey = this.TargetSection.Key
  }

  TargetQuestionChanged()
  {
    debugger
    this.status = -1
    if(this.TargetSubSection != undefined)
      this.Condition.AttributeKey = this.TargetSubSection.Key
    else
      this.Condition.AttributeKey = this.TargetSection.Key
  }

  TargetChanged(value)
  {
    debugger
    switch(value)
    {
      case "2":
        this.TargetSection = this.Section
        break;
      case "1":
        var Qn = undefined
        if(this.SubSection)
          Qn = this.SubSection.Questions.find(x => x.Key == this.Question.Key)

        if(Qn)
        {
          this.TargetSubSection = this.SubSection
          this.TargetSection = undefined
        }
        else
        {
          this.TargetSection = this.Section
          this.TargetSubSection = undefined
        }
        break;
    }

    this.status = -1
  }

  DependencyChanged(event)
  {
    debugger
    if(event.currentTarget.checked)
    {
      this.Question.Dependencies = []
    }
    else
    {
      if(this.Question.Dependencies.length > 0)
        this.Question.Dependencies.forEach(x => x.Deleted = true)

      this.Question.Dependencies = undefined
      this.Dependency = undefined
    }
    this.status = -1
  }

  ChangeRequiredState(event){
    this.Question.Required = event.currentTarget.checked
  }

  SkipConditionChanged(event)
  {
    debugger
    if(event.currentTarget.checked)
    {
      if(this.Question.Conditions == undefined)
        this.Question.Conditions = []

      if(this.Question.Conditions.length == 0)
      {
        this.Condition = new SkipCondition()
        this.Condition.DataCollectionObectType = 0
        this.Condition.Key = Guid.create().toString()
        this.Condition.Answer = new EnumValue()
        this.Condition.Target = new Target()
        this.Condition.Target.Section = new Section()
        this.Condition.Target.SubSection = new SubSection()
        this.Condition.Target.Question = new Question()
      }
    }
    else
    {
      this.Condition = undefined
    }

    this.status = -1
  }

  OnInitSection(key) {
    debugger
    if(key.currentTarget.id != "")
    {
      this.Section = this.Sections.find(x => x.Key == key.currentTarget.id.toString())
      this.item_delete = "section"
    }
    else
    {
      this.Section = new Section()
      this.Section.Key = Guid.create().toString()
    }
  }

  OnInitSubSection(key)
  {
    debugger
    if(key.currentTarget.id != "")
    {
      let subSections = this.Sections.map(function(p)
      {
        if(p.SubSections != undefined)
        {
          if(p.SubSections)
          {
            let subsection = p.SubSections.find(x => x.Key == key.currentTarget.id.toString());
            if(subsection)
              return subsection;
          }
        }
      })

      this.SubSection = subSections.find( x => x != undefined)
      let sections = this.Sections.map(function(section){
        debugger
        if(section.SubSections)
        {
          section.SubSections.forEach( x => x.IsSelected = false)
          if(section.SubSections.find(s => s.Key == key.currentTarget.id) != undefined)
            return section
        }
      });
      this.Section = sections.find(x => x != undefined)
      this.Section.IsSelected = false;

      this.SubSection.IsSelected = true;
    }
    else
    {
      this.SubSection = new SubSection()
      this.SubSection.Key = Guid.create().toString()
    }

    this.IsSubSectionBound = true;
  }

  OnSubmitQuestion(data) {
    debugger;
    this.status = -1
    this.Question.QuestionText = data.QuestionText
    this.Question.DataType = data.DataType
    if(data.Required != "")
      this.Question.Required = data.Required

    if(this.Condition)
    {
      if(this.Condition.DataCollectionObectType == DataCollectionObectTypes.Question)
      {
        if(this.TargetSection)
          this.Condition.Target.Question = this.TargetSection.Questions.find(x => x.Key == data.Target)
        else
          this.Condition.Target.Question = this.TargetSubSection.Questions.find(x => x.Key == data.Target)
      }

      this.Condition.Answer = new EnumValue()
      this.Condition.Answer = this.Question.EnumList.EnumValues.find(y => y.Code == data.Answer)

      if(this.Question.Conditions.find(x => x.Key == this.Condition.Key) == undefined)
        this.Question.Conditions.push(this.Condition);
    }

    if(this.IsSubSectionBound)
    {
      if (this.SubSection.Questions == undefined)
        this.SubSection.Questions = []

      var q = this.SubSection.Questions.find(x=>x.Key == this.Question.Key)
      if(q == undefined) //Question does not exist
        this.SubSection.Questions.push(this.Question)
    }
    else
    {
      if (this.Section.Questions == undefined)
        this.Section.Questions = []

      var q = this.Section.Questions.find(x => x.Key == this.Question.Key)
      if(q == undefined) //Question does not exist
        this.Section.Questions.push(this.Question)
    }

    this.x_question.nativeElement.click()
  }

  OnEditSubSectionQuestion(event)
  {
    debugger
    this.status = -1
    this.SubSection = this.Sections.map(function(p){ p.SubSections.forEach(x => x.IsSelected = false); return p.SubSections.find(x => x.Key == event.currentTarget.value.toString()); }).find(y => y != undefined)
    if(this.SubSection)
    {
      this.Question = this.SubSection.Questions.find(x => x.Key == event.currentTarget.id.toString())
      this.IsSubSectionBound = true
      this.SubSection.IsSelected = true

      if(this.Question.Conditions != undefined)
      {
        if(this.Question.Conditions.length > 0)
        {
          this.Condition = this.Question.Conditions[0]
          if(!this.Condition.Target.Section)
            this.Condition.Target.Section = new Section()

          if(!this.Condition.Target.SubSection)
            this.Condition.Target.SubSection = new SubSection()

          if(!this.Condition.Target.Question)
            this.Condition.Target.Question = new Question()

            this.TargetSection = undefined
            this.TargetSubSection = this.SubSection
        }
        else
        {
          this.Condition = undefined
          this.TargetSection = undefined
        }
      }
      else
      {
        this.Condition = undefined
        this.TargetSection = undefined
      }
    }
  }

  OnEditQuestion(_key) {
    debugger
    this.status = -1
    //Find section containing the question
    let sections = this.Sections.map(function(section){
      if(section.Questions != undefined)
        if(section.Questions.find(s => s.Key == _key.currentTarget.id) != undefined)
          return section
    });
    this.Section = sections.find(s => s != undefined)

    if(this.Section)
    {
      this.Question = this.Section.Questions.find(x => x.Key == _key.currentTarget.id.toString())
      if(this.Question.Conditions != undefined)
      {
        if(this.Question.Conditions.length > 0)
        {
          this.Condition = this.Question.Conditions[0]
          if(this.Condition.Target)
          {
            if(!this.Condition.Target.Section)
            this.Condition.Target.Section = new Section()

            if(!this.Condition.Target.SubSection)
              this.Condition.Target.SubSection = new SubSection()

            if(!this.Condition.Target.Question)
              this.Condition.Target.Question = new Question()
          }


            this.TargetSection = this.Sections.find(x => x.Key == this.Condition.AttributeKey)
            this.TargetSubSection = this.Section.SubSections.find(x => x.Key == this.Condition.AttributeKey)
        }
        else
        {
          this.Condition = undefined
          this.TargetSection = undefined
        }
      }
      else
      {
        this.Condition = undefined
        this.TargetSection = undefined
      }

      if(this.Question.Dependencies != undefined)
        if(this.Question.Dependencies.length == 0)
          this.Question.Dependencies = undefined
    }

    this.Section = undefined
  }

  OnDeleteSubSection(event)
  {
    this.OnInitSubSection(event)
    this.item_delete = "subsection"
  }

  OnDeleteQuestion(_key) {
    debugger
    //this.Question = this.Questionaire.Sections.map(x => x.Questions.find(y => y.Key == _key.currentTarget.id.toString()))[0]
    //this.Question = this.Questionaire.Sections.map(function(p){ return p.Questions.find(x => x.Key == _key.currentTarget.id.toString()); })[0]
    this.item_delete = "question"
    this.Question = this.Section.Questions.find(x => x.Key == _key.currentTarget.id.toString())
  }

  OnDeleteSubSectionQuestion(event)
  {
    debugger
    this.SubSection = this.Sections.map(function(p){ p.SubSections.forEach(x => x.IsSelected = false); return p.SubSections.find(x => x.Key == event.currentTarget.value.toString()); }).find(y => y != undefined)
    if(this.SubSection)
    {
      this.Question = this.SubSection.Questions.find(x => x.Key == event.currentTarget.id.toString())
      this.item_delete = "question"
      this.IsSubSectionBound = true
      this.SubSection.IsSelected = true
    }
  }

  OnConfirmDeleteQuestion() {
    debugger;
    this.status = -1
    if (this.Question != undefined)
      this.Question.Deleted = true;

    this.x_delete.nativeElement.click()
  }

  OnConfirmDeleteSection() {
    debugger;
    this.status = -1
    if (this.Section != undefined)
      this.Section.Deleted = true;

    this.Section = undefined

    this.x_delete.nativeElement.click()
  }

  OnConfirmDeleteSubSection() {
    debugger;
    this.status = -1
    if (this.SubSection != undefined)
      this.SubSection.Deleted = true;

      this.SubSection = undefined

    this.x_delete.nativeElement.click()
  }

  InitCategory(event)
  {
    debugger
    if(event == undefined)
    {
      this.Category = new Category()
      this.Category.Key = Guid.create().toString()
    }
    else if(event != undefined && this.Questionaire != undefined)
    {
      this.Category = this.Questionaire.Categories.find(x => x.Key == event.currentTarget.id.toString())
      this.item_delete = 'category'
    }
  }

  InitRegion(event)
  {
    debugger
    if(event == undefined)
    {
      this.Region = new Region()
      this.Region.Key = Guid.create().toString()
    }
    else if(event != undefined && this.Questionaire != undefined)
    {
      this.Region = this.Questionaire.Regions.find(x => x.Key == event.currentTarget.id.toString())
      this.item_delete = 'region'
    }
  }

  OnConfirmDeleteCategory()
  {
    this.status = -1
    this.Category.Deleted = true;
    this.x_delete.nativeElement.click()
  }

  OnConfirmDeleteRegion()
  {
    this.status = -1
    this.Region.Deleted = true;
    this.x_delete.nativeElement.click()
  }

  OnCreateQuestionaire(data)
  {
    this.status = -1
    this.Questionaire.Name = data.QuestionaireName
    this.Questionaire.ConfigurationId = this.Configuration_Id
    this.Questionaire.Status = Statuses.Template

    this.x_questionaire.nativeElement.click()
  }

  OnCreateTemplate(data)
  {
    debugger
    this.status = -1
    this.Template.Name = data.Name
    this.Template.TemplateType = data.TemplateType
    this.Template.Description = data.Description
    this.Template.Category = this.Categories.find(x => x.Key == data.Category)

    this.x_template.nativeElement.click()
  }

  OnCreateCategory(data)
  {
    debugger
    this.status = -1
    this.Category.Name = data.Name
    if(this.Questionaire != undefined)
    {
      if(this.Questionaire.Categories.filter(x => x.Key == this.Category.Key).length == 0)
        this.Questionaire.Categories.push(this.Category)

        this.x_category.nativeElement.click()
    }
    else
    {
      let json = JSON.stringify(this.Category)

      this.Categories.push(this.Category)
      this.httpClient.post(this.config.REST_API_SERVICE + "/category/", json, {headers: this.config.headers}).subscribe(data => {
        debugger
        if(<boolean>JSON.parse(JSON.stringify(data)))
        {
          this.Template.Category = this.Category
          this.x_category.nativeElement.click()
          this.InitCategories()
        }
        else
          alert("Something went wrong, please try again. If it fails, kindly contact our support team for assistence")
      })
    }
  }

  OnSaveRegion(data)
  {
    debugger
    this.status = -1
    this.Region.Name = data.Name
    this.Region.Prefix = data.Prefix
    if(this.Questionaire != undefined)
    {
      if(this.Questionaire.Regions.filter(x => x.Key == this.Region.Key).length == 0)
        this.Questionaire.Regions.push(this.Region)

        this.x_region.nativeElement.click()
    }
  }

  OnCreateCertification(data)
  {
    debugger
    this.status = -1
    this.Certification = new Certification()
    this.Certification.Status = 0
    this.Certification.Description = data.Description
    this.Certification.DateTime = new Date()
    this.Certification.CerificationType = data.CertificationType
    this.Certification.ConfigurationId = this.Configuration_Id
    this.Certification.Name = data.Name
    this.Certification.Key = Guid.create().toString()
    this.Certification.Status = Statuses.Template

    this.x_certification.nativeElement.click()
  }

  OnCreateInspection()
  {
    debugger
    this.status = -1
    this.Inspection = new FieldInspection()
    this.Inspection.Key = Guid.create().toString()
    this.Inspection.DateTime = new Date()
    this.Inspection.Status = Statuses.Template
    this.Inspection.ConfigurationId = this.Configuration_Id
    this.Sections = []
  }

  public async OnCancel()
  {
    debugger
    this.NotifyChanges()
  }

  Delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  async OnDiscardChanges()
  {
    this.x_discard.nativeElement.click() //close discard window
    await this.Delay(500)
    this.location.back();
  }

  async OnSave()
  {
    debugger
    this.x_discard.nativeElement.click() //close discard window in case it's open
    if(this.Sections == undefined)
    {
      alert("You have no sections added, please do to proceed")
      return
    }

    await new Promise(resolve => setTimeout(resolve, 500))
    this.pleasewait.nativeElement.click()

    switch(this.action)
    {
      case 'questionaire':
        this.Questionaire.CreatedBy = this.authentication.User.Key
        this.Questionaire.Sections = this.Sections
        let json = JSON.stringify(this.Questionaire)
        this.httpClient.post(this.config.REST_API_SERVICE + "/questionaire/", json, {headers: this.config.headers}).subscribe(async data => {
          debugger
          if(<boolean>JSON.parse(JSON.stringify(data)))
          {
            alert("Your questionaire has been added")
            this.x_pleasewait.nativeElement.click()
            await new Promise(resolve => setTimeout(resolve, 500))
            this.location.back()
          }
          else
            alert("Something went wrong, please try again. If it fails, kindly contact our support team for assistence")
        })
        break

      case 'inspection':
        debugger
        this.Inspection.CreatedBy = this.authentication.User.Key
        this.Inspection.Sections = this.Sections
        json = JSON.stringify(this.Inspection)
        this.httpClient.post(this.config.REST_API_SERVICE + "/inspection/", json, {headers: this.config.headers}).subscribe(async data => {
          debugger
          if(<boolean>JSON.parse(JSON.stringify(data)))
          {
            alert("Your inspection has been added")
            this.x_pleasewait.nativeElement.click()
            await new Promise(resolve => setTimeout(resolve, 500))
            this.location.back()
          }
          else
            alert("Something went wrong, please try again. If it fails, kindly contact our support team for assistence")
        })
        break

      case 'certification':
        this.Certification.CreatedBy = this.authentication.User.Key
        this.Certification.Sections = this.Sections
        json = JSON.stringify(this.Certification)
        this.httpClient.post(this.config.REST_API_SERVICE + "/certification/", json, {headers: this.config.headers}).subscribe(async data => {
          debugger
          if(<boolean>JSON.parse(JSON.stringify(data)))
          {
            alert("Your certification has been added successfully")
            this.x_pleasewait.nativeElement.click()
            await new Promise(resolve => setTimeout(resolve, 500))
            this.location.back()
          }
          else
            alert("Something went wrong, please try again. If it fails, kindly contact our support team for assistence")
        })
        break
      case 'template':
        debugger
        this.Template.Sections = this.Sections
        json = JSON.stringify(this.Template)
        this.httpClient.post(this.config.REST_API_SERVICE + "/template/", json, {headers: this.config.headers}).subscribe(async data => {
          debugger
          if(<boolean>JSON.parse(JSON.stringify(data)))
          {
            alert("Your template has been added")
            this.x_pleasewait.nativeElement.click()
            await new Promise(resolve => setTimeout(resolve, 500))
            this.location.back()
          }
          else
            alert("Something went wrong, please try again. If it fails, kindly contact our support team for assistence")
        })
        break
    }

    this.status = 0
  }
}
