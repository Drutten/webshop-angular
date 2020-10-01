import { Subject } from 'rxjs';
import { IOrder } from '../interfaces/i-order';
import { IOrderService } from '../interfaces/i-order-service';

export class OrderServiceMock implements IOrderService {

  orders = new Subject<IOrder[]>();
  orders$ = this.orders.asObservable();
  order = new Subject<IOrder>();
  order$ = this.order.asObservable();
  errorMessage = new Subject<string>();
  errorMessage$ = this.errorMessage.asObservable();
  isSuccessful = new Subject<boolean>();
  isSuccessful$ = this.isSuccessful.asObservable();
  isFetching = new Subject<boolean>();
  isFetching$ = this.isFetching.asObservable();
  isFetchingOrder = new Subject<boolean>();
  isFetchingOrder$ = this.isFetchingOrder.asObservable();
  errorMessageOrder = new Subject<string>();
  errorMessageOrder$ = this.errorMessageOrder.asObservable();


  fetchOrders(): void {
    this.orders.next([
      {
        id: 1,
        companyId: 1,
        created: '2020-01-01T17:00:00Z',
        createdBy: 'Kalle',
        paymentMethod: 'Visa',
        totalPrice: 200,
        status: 2,
        orderRows: []
      },
      {
        id: 2,
        companyId: 1,
        created: '2020-01-01T17:00:00Z',
        createdBy: 'Anna',
        paymentMethod: 'Visa',
        totalPrice: 200,
        status: 2,
        orderRows: []
      }
    ])
  }

  fetchOrder(id: number): void {
    this.order.next({
      id: 2,
      companyId: 1,
      created: '2020-01-01T17:00:00Z',
      createdBy: 'Anna',
      paymentMethod: 'Visa',
      totalPrice: 200,
      status: 2,
      orderRows: []
    });
  }

  postOrder(data: IOrder): void {}

  deleteOrder(id: number): void {}

}
