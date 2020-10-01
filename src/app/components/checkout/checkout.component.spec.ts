import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/services/cart.service';
import { CartServiceMock } from 'src/app/services/cart.service.mock';
import { OrderService } from 'src/app/services/order.service';
import { OrderServiceMock } from 'src/app/services/order.service.mock';

import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutComponent ],
      providers: [
        {provide: OrderService, useClass: OrderServiceMock},
        {provide: CartService, useClass: CartServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 items in cart', () => {
    expect(component.cart.length).toBe(2);
  });

  it('should call orderService postOrder when sendOrder is called', () => {
    let orderService = fixture.debugElement.injector.get(OrderService);
    let spy = spyOn(orderService, 'postOrder');
    component.sendOrder({
      companyId: 1,
      created: '2020-09-23',
      createdBy: 'me',
      paymentMethod: 'visa',
      totalPrice: 100,
      status: 2,
      orderRows: []
    });
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

});
