import { OrderStatus } from "@/generated/prisma/enums";
import { IWatch } from "./watch.interface";

export interface IOrder {
  id?: number;
  userId: string;
  items: IWatch[];
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  nameOnCard: string;
  status: OrderStatus;
}
