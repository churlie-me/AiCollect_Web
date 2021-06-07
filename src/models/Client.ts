import { User } from "./User";
import { Package } from "./Package";

export class Client {
  OID: string;
  Key: string;
  Name: string;
  Email: string;
  Contact: string;
  Location: string;
  Package: Package;
  Users: User[];
  Deleted: boolean
  Logo: string
}
