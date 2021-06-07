import { Section } from "./Section";
import { Statuses, CertificationTypes } from "../enums/enums";

export class Certification {
  public Key: string;
  public Status: Statuses;
  public Sequence: number;
  public Name: string;
  public CreatedBy: string
  public DateTime: Date;
  public Description: string;
  public CerificationType: CertificationTypes;
  public Sections: Section[];
  public FarmerKey: string;
  public ConfigurationId: string;
  public Deleted : boolean
}
