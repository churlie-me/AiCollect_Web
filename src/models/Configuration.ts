import { Questionaire } from "./Questionaire";
import { EnumList } from "./EnumList";
import { User } from "./User";
import { UserRight } from "./UserRight";
import { DbInfo } from "./DbInfo";
import { FieldInspection } from "./FieldInspection";
import { Training } from "./Training";
import { Certification } from "./Certification";
import { Purchase } from "./Purchase";
import { Settings } from "./Settings";
import { SyncDirection, ConfigurationTypes } from "../enums/enums";
import { ConfigurationVersion } from "./ConfigurationVersion";
import { Client } from "./Client";

export class Configuration {
  public OID: number;
  public Key: string;
  public FileName: string;
  public Icon: string;
  public SyncDirection: SyncDirection;
  public CreatedOn: Date;
  public ModifiedOn: Date;
  public ModifiedBy: string;
  public RequireLocation: boolean;
  public Name: string;
  public Type: ConfigurationTypes
  public Domain: string;
  public Database: string;
  public Description: string;
  public ConfigVersion : ConfigurationVersion;
  public Version: string;
  public Status: number;
  public Questionaires: Questionaire[];
  public EnumerationLists: EnumList[];
  public Users: User[];
  public UserRights: UserRight[];
  public DbInfo: DbInfo;
  public Settings: Settings;
  public Purchases: Purchase;
  public Certifications: Certification[];
  public Trainings: Training[];
  public Regions: EnumList;
  public Products: EnumList;
  public Prices: EnumList;
  public Inspections: FieldInspection[];
  public Client : Client;
  public Deleted: boolean
}
