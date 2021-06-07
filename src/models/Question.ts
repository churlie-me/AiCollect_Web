import { EnumList } from "./EnumList";
import { Answer } from "./Answer";
import { DataTypes, QuestionTypes } from "src/enums/enums";
import { SkipCondition } from "./SkipCondition";
import { Dependency } from "./Dependency";

export class Question {
  OID: number
  Key: string;
  Name: string;
  QuestionText: string;
  Deleted: boolean;
  DataType: DataTypes;
  QuestionType: QuestionTypes;
  CollectionObjectType: number;
  EnumList: EnumList;
  Answers: Answer[]
  Required: boolean = false
  Conditions: SkipCondition[]
  Dependencies: Dependency[]
  Occurance : number
}
