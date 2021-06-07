import { EnumValue } from "./EnumValue";
import { EnumListTypes } from "../enums/enums";

export class EnumList {
  Key: string
  Name: string
  EnumListType: EnumListTypes
  EnumValues: EnumValue[]
  TableName: string
  ConfigurationId: number
}
