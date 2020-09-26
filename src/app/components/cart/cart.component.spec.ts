import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/services/cart.service';
import { CartServiceMock } from 'src/app/services/cart.service.mock';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartComponent ],
      providers: [{provide: CartService, useClass: CartServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be a cart with 2 elements', () => {
    expect(component.cart.length).toBe(2);
  });

  it('should be a total of 400 in cart', () => {
    const total: number = component.getCartTotal();
    expect(total).toBe(400);
  })
});
