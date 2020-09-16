import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: string[] = [
    'order 1',
    'order 2',
    'order 3',
    'order 4'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
