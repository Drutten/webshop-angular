import { IOrderRow } from './i-order-row';

export interface IOrder {
  id?: number;
  companyId: number;
  created: string;
  createdBy: string;
  paymentMethod: string;
  totalPrice: number;
  status: number;
  orderRows: IOrderRow[];
}
