import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/interfaces/i-order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: IOrder[] = [];
  isFetching = false;
  errorText = '';
  ordersSubscription: Subscription;
  isFetchingSubscription: Subscription;
  errorSubscription: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.ordersSubscription = this.orderService.orders$.subscribe(orders => {
      this.orders = orders;
    });
    this.isFetchingSubscription = this.orderService.isFetching$.subscribe(fetching => {
      this.isFetching = fetching;
    });
    this.errorSubscription = this.orderService.errorMessage$.subscribe(error => {
      this.errorText = error;
    });
    this.orderService.fetchOrders();
  }

  ngOnDestroy() {
    this.ordersSubscription.unsubscribe();
    this.isFetchingSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
  }

}
