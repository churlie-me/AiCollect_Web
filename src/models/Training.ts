import { Topic } from "./Topic";
import { Trainer } from "./Trainer";

export class Training {
  public OID: number
  public Key: string
  public Name: string
  public StartDate: Date
  public EndDate: Date
  public Location: string
  public Trainers: Trainer[]
  public Topics: Topic[]
  public Trainees: string[]
  public ConfigurationId: number
}
