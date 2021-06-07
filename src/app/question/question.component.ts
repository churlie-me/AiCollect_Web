import { SubSection } from './../../models/SubSection';
import { Questionaire } from './../../models/Questionaire';
import { Target } from './../../models/Target';
import { Component, Input } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { DataCollectionObectTypes, DataTypes, QuestionTypes } from "src/enums/enums";
import { Question } from "src/models/Question";
import { SkipCondition } from "src/models/SkipCondition";
import { Answer } from 'src/models/Answer';

@Component({
    selector: 'ng-question',
    templateUrl: './question.component.html'
  })
export class QuestionComponent
{
    dataTypes = DataTypes
    @Input()
    question: Question;

    @Input()
    holder: any;

    @Input()
    action: any;

    @Input()
    dependencies: string[]

    @Input()
    conditions: string[]

    @Input()
    questionaire : any

    @Input()
    occurance : string

    constructor(private domSanitizer: DomSanitizer) {  }
    ngOnInit() {
      if(this.question.Answers.length == 0)
      {
        this.question.Answers.push(new Answer())
      }

      if(this.question.DataType == DataTypes.Date)
        if(this.question.Answers.length > 0)
          this.question.Answers[0].AnswerText = new Date(this.question.Answers[0].AnswerText).toISOString().split('T')[0]
    }

  public EnumDescription(question: Question, Code: any)
  {
      if(question.EnumList.EnumValues.length > 0)
      {
          var _enum = question.EnumList.EnumValues.find(x => x.Code == Code)
          if(_enum)
            return _enum.Description
      }

      return undefined
  }

  initImage(base64: any)
  {
      return "data:'image/jpeg';base64," + base64
  }

  ChoicesChanged(question : Question, code : any, event : any)
  {
    let eAnswer = question.Answers.find(x => x.AnswerText == code)
    if(event.currentTarget.checked)
    {
      if(eAnswer == undefined)
      {
        let answer = new Answer();
        answer.QuestionaireKey = question.Key;
        answer.AnswerText = code;
        answer.Occurance = question.Occurance
        answer.Deleted = false
        question.Answers.push(answer)
      }
    }
    else
      eAnswer.Deleted = true
  }

  IsChecked(question : Question, code : any)
  {
    let v = question.Answers.find(x => x.AnswerText == code) != undefined
    return v
  }

  getCondition(targetKey)
  {
    let subSection = this.questionaire.Sections.map(function(section){
      var target =  section.SubSections.find(s => s.Key == targetKey)
      if(target != undefined)
        return target
    })

    return subSection.find(s => s != undefined)
  }
}
