import { UserStatus } from "src/enums/enums";
import { UserRight } from "./UserRight";

export class User {
  OID: number;
  Key: string;
  UserName: string;
  Password: string;
  Email: string;
  Firstname: string;
  IsAdmin: boolean
  Lastname: string;
  Usercode: string;
  UserRights: UserRight[];
  ClientId: number;
  ConfigurationId: number;
  Status: UserStatus
  Deleted: boolean
  Enabled : boolean
}
