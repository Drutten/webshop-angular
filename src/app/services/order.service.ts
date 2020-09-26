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
  private errorMessage = new Subject<string>();
  errorMessage$ = this.errorMessage.asObservable();
  private isSuccessful = new Subject<boolean>();
  isSuccessful$ = this.isSuccessful.asObservable();

  constructor(private http: HttpClient) { }

  fetchOrders() {
    this.http.get(API_ORDERS_ENDPOINT + '?companyId=' + COMPANY_ID)
    .subscribe(orders => {
      console.log(orders);
    }, err => {
      console.log(err);
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
    this.http.delete(`${API_ORDERS_ENDPOINT}/${id}`)
    .subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}
