import { Section } from "./Section";
import { Category } from "./Category";
import { Region } from "./Region";

export class Questionaire {
  Key: string
  Name: string
  CreatedBy: string
  Category: Category
  QuestionaireCode: string
  Status: number
  Sections: Section[]
  Categories: Category[]
  Regions : Region[]
  ConfigurationId : string
  Deleted : boolean
}
