import { Category } from "./Category"
import { Section } from "./Section"
import { TemplateType } from "src/enums/enums"

export class Template
{
    public OID: number
    public Key: string
    public Name: string
    public Status: number
    public Description: string
    public TemplateType: TemplateType
    public Category: Category
    public Sections: Section[]
    public Deleted: boolean
}
