import { IOrder } from './i-order';

export interface IOrderService {

  fetchOrders(): void;
  postOrder(data: IOrder): void;
}
