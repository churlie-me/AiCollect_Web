import { ObjectType } from "src/enums/enums";
import { UserPermission } from "./UserPermission";
import { Configuration } from "./Configuration";

export class UserRight {
  ObjectName: string
  ObjectType: ObjectType
  PrimaryKey: string
  Deleted: boolean
  SecondaryKey: string
  IsSystem: boolean
  Key: string
  UserPermissions: UserPermission[]
  Configuration: Configuration
}
