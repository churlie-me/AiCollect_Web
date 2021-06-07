import { UserRight } from "./UserRight"
import { PermisionType } from "src/enums/enums"
import { Configuration } from "./Configuration"

export class UserPermission {
  Permission: PermisionType
  Key: string
  OID: number
}
