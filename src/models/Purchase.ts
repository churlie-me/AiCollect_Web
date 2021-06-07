import { EnumValue } from "./EnumValue";

export class Purchase {
  public Farmer: string;
  public Station: EnumValue;
  public Price: number;
  public Quantity: number;
  public Product: EnumValue;
  public DateOfPurchase: Date;
  public TotalAmount: number;
  public Lotid: string;
}
