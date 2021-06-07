import { Section } from "./Section";
import { Statuses } from "../enums/enums";

export class FieldInspection {
  public OID: number;
  public Key: string;
  public DateTime: Date;
  public CreatedBy: string
  public Status: Statuses;
  public FarmerKey: string;
  public FieldName: string;
  public Sections: Section[];
  public Coordinates: string[];
  ConfigurationId: string;
  Deleted : boolean
}
