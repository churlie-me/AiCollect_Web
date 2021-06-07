import { DataCollectionObectTypes } from "src/enums/enums";
import { Target } from "./Target";

export class Dependency
{
    public OID: number
    public Key: string
    public Target: Target
    public QuestionKey: string
    public TargetObjectKey: string
    public TargetObjectType: DataCollectionObectTypes
    public Deleted: boolean
}
