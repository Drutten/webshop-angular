import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderService } from 'src/app/services/order.service';
import { OrderServiceMock } from 'src/app/services/order.service.mock';

import { OrderDetailComponent } from './order-detail.component';

describe('OrderDetailComponent', () => {
  let component: OrderDetailComponent;
  let fixture: ComponentFixture<OrderDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDetailComponent ],
      imports: [RouterTestingModule],
      providers: [{provide: OrderService, useClass: OrderServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an id of 2', () => {
    expect(component.order.id).toBe(2);
  });

  it('should not call service method #deleteOrder when #onDelete is called without confirm', () => {
    const orderService = fixture.debugElement.injector.get(OrderService);
    const spy = spyOn(orderService, 'deleteOrder');
    expect(spy).not.toHaveBeenCalled();
  })
});
