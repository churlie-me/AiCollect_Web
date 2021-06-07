import { Question } from "./Question"
import { Answer } from "./Answer"
import { EnumValue } from "./EnumValue"
import { DataCollectionObectTypes } from "src/enums/enums"
import { Target } from "./Target"


export class SkipCondition
{
    public OID: number
    public Key: string
    public Answer: EnumValue
    public DataCollectionObectType : DataCollectionObectTypes
    public Target: Target
    public AttributeKey: string
}
