import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() order: string;
  @Input() index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
