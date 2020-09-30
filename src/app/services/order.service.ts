import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IOrder } from '../interfaces/i-order';
import { IOrderService } from '../interfaces/i-order-service';
import { API_ORDERS_ENDPOINT } from '../shared/constants';
import { COMPANY_ID } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements IOrderService{
  private orders = new Subject<IOrder[]>();
  orders$ = this.orders.asObservable();
  private order = new Subject<IOrder>();
  order$ = this.order.asObservable();
  private errorMessage = new Subject<string>();
  errorMessage$ = this.errorMessage.asObservable();
  private isSuccessful = new Subject<boolean>();
  isSuccessful$ = this.isSuccessful.asObservable();
  private isFetching = new Subject<boolean>();
  isFetching$ = this.isFetching.asObservable();
  private isFetchingOrder = new Subject<boolean>();
  isFetchingOrder$ = this.isFetchingOrder.asObservable();
  private errorMessageOrder = new Subject<string>();
  errorMessageOrder$ = this.errorMessageOrder.asObservable();

  constructor(private http: HttpClient) { }

  fetchOrders() {
    this.isFetching.next(true);
    this.errorMessage.next('');
    this.http.get<IOrder[]>(API_ORDERS_ENDPOINT + '?companyId=' + COMPANY_ID)
    .subscribe(orders => {
      this.isFetching.next(false);
      console.log(orders);
      this.orders.next(orders);
    }, err => {
      this.isFetching.next(false);
      console.log(err);
      this.errorMessage.next((err.status)? this.getErrorMessage(err.status) : 'Försök igen lite senare');
    })
  }

  fetchOrder(id: number): void {
    this.isFetchingOrder.next(true);
    this.errorMessageOrder.next('');
    this.http.get<IOrder>(`${API_ORDERS_ENDPOINT}/${id}`)
    .subscribe(order => {
      this.isFetchingOrder.next(false);
      this.order.next(order);
    }, err => {
      this.isFetchingOrder.next(false);
      this.errorMessageOrder.next((err.status)? this.getErrorMessage(err.status) : 'Försök igen lite senare');
    })
  }

  postOrder(data: IOrder) {
    this.isSuccessful.next(false);
    this.errorMessage.next('');
    this.http.post(API_ORDERS_ENDPOINT, data)
    .subscribe(res => {
      this.isSuccessful.next(true);
      console.log(res);
    }, err => {
      console.log(err);
      this.errorMessage.next('Köpet kunde inte genomföras. Försök igen senare');
    });
  }

  deleteOrder(id: number) {
    this.errorMessage.next('');
    this.http.delete(`${API_ORDERS_ENDPOINT}/${id}`)
    .subscribe(res => {
      console.log(res);
      this.fetchOrders();
    }, err => {
      this.errorMessage.next(`Någonting gick fel när ordern skulle tas bort`);
      console.log(err);
    });
  }



  private getErrorMessage(status: number): string {
    let text = '';
    switch(status) {
      case 400: text = `Felaktig begäran från klienten`;
      break;
      case 404: text = `Kunde inte hittas`;
      break;
      case 500: text = `Internt serverfel. Försök igen lite senare`;
      break;
      default: text = `Försök igen lite senare`;
    }
    return text;
  }
}
