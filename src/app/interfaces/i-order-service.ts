import { IOrder } from './i-order';

export interface IOrderService {

  fetchOrders(): void;
  fetchOrder(id: number): void;
  postOrder(data: IOrder): void;
}
