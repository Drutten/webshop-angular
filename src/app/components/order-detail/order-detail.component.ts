import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IOrder } from 'src/app/interfaces/i-order';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit, OnDestroy {
  order: IOrder;
  errorText = '';
  isFetching = false;
  orderSubscription: Subscription;
  errorSubscription: Subscription;
  fetchingSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderSubscription = this.orderService.order$.subscribe(order => {
      this.order = order;
    });
    this.errorSubscription = this.orderService.errorMessageOrder$.subscribe(error => {
      this.errorText = error;
    });
    this.fetchingSubscription = this.orderService.isFetchingOrder$.subscribe(fetching => {
      this.isFetching = fetching;
    })
    this.route.params.subscribe(
      (params) => {
        this.orderService.fetchOrder(+params.id);
      }
    );
  }

  ngOnDestroy(): void {
    this.orderSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.fetchingSubscription.unsubscribe();
  }


  onDelete() {
    const r = confirm('Ta bort denna order');
    if(r) {
      this.orderService.deleteOrder(this.order.id);
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }


  getDateString(utcDate: string): string {
    const date = new Date(utcDate);
    let newDate = new Date(date.getTime() + date.getTimezoneOffset()*60*1000);
    const offset = date.getTimezoneOffset() / 60;
    const hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate.toLocaleString();
  }

}
