import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderService } from 'src/app/services/order.service';
import { OrderServiceMock } from 'src/app/services/order.service.mock';

import { OrdersComponent } from './orders.component';

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdersComponent ],
      providers: [{provide: OrderService, useClass: OrderServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get 2 orders when loading', () => {
    expect(component.orders.length).toBe(2);
  })
});
