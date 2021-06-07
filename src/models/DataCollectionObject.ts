import { DataCollectionObectTypes } from "src/enums/enums"

export class DataCollectionObject
{
    public OID: number
    public Key: string
    public Deleted: boolean
    public Name: string
    public CollectionObjectType: DataCollectionObectTypes
    public IsSystem: boolean
}