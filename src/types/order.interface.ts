import { OrderStatus } from "@/generated/prisma/enums";
import { IWatch } from "./watch.interface";

type State = "Ukraine" | "United States" | "Germany";

interface IOrderItem {
  orderId: bigint;
  watchId: bigint;
  quantity: number;
  watch: IWatch;
}

export interface IOrder {
  id?: bigint;
  userId: string;
  items: IOrderItem[];
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: State;
  zipCode: string;
  phone: string;
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  nameOnCard: string;
  status: OrderStatus;
  orderNumber: string;
  email: string;
}

export interface ITrackOrder {
  order: string;
  phoneNumber: string;
}
