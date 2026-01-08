import { OrderStatus } from "@/generated/prisma/enums";
import type { IWatch } from "./watch.interface";

export interface IOrder {
  id?: bigint;
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
  orderNumber: string;
}

export interface ITrackOrder {
  order: string;
  phoneNumber: string;
}
