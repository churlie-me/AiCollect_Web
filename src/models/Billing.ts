import { Client } from "./Client"
import { Package } from "./Package"

export class Billing
{
    public OID: number
    public guid: string
    public Bill: number
    public BillingDate: Date
    public InvoiceNo: string
    public Client: Client
    public Package: Package
}