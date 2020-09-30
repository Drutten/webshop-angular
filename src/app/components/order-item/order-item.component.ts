import { Component, Input, OnInit } from '@angular/core';
import { IOrder } from 'src/app/interfaces/i-order';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order: IOrder;

  constructor() { }

  ngOnInit(): void {
  }

}
