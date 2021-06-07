import { Question } from "./Question";
import { SubSection } from "./SubSection";

export class Section {
  Key: string
  Name: string
  Description: string
  Questions: Question[]
  SubSections: SubSection[]
  QuestionaireKey: string
  CertificationKey: string
  InspectionKey: string
  Deleted: boolean
  IsSelected: boolean
}
