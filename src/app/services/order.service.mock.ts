import { Subject } from 'rxjs';
import { IOrder } from '../interfaces/i-order';
import { IOrderService } from '../interfaces/i-order-service';

export class OrderServiceMock implements IOrderService {
  orders: IOrder[] = [];
  errorMessage = new Subject<string>();
  errorMessage$ = this.errorMessage.asObservable();
  isSuccessful = new Subject<boolean>();
  isSuccessful$ = this.isSuccessful.asObservable();


  fetchOrders() {
    console.log('fetch orders');
  }

  postOrder(data: IOrder) {
    this.orders.push(data);
  }

}
