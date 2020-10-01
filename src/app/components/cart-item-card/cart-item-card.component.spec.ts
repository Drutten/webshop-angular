import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/services/cart.service';
import { CartServiceMock } from 'src/app/services/cart.service.mock';

import { CartItemCardComponent } from './cart-item-card.component';

describe('CartItemCardComponent', () => {

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemCardComponent, TestHostComponent ],
      providers: [{provide: CartService, useClass: CartServiceMock}]
    })
    .compileComponents();
  });


  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });



  it('should have 2 as quantity', () => {
    testHostFixture.detectChanges();
    expect(testHostComponent.cartItemCardComponent.cartItem.quantity).toBe(2);
  });


  it('should display test', () => {
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('h5').innerText).toContain('test');
  });


  it('should call service method #updateCartItem by calling #update', () => {
    let cartService = testHostFixture.debugElement.injector.get(CartService);
    let spy = spyOn(cartService, 'updateCartItem');
    testHostComponent.cartItemCardComponent.update(1);
    testHostFixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  
  it('should call service method #removeCartItem by calling #remove', () => {
    let cartService = testHostFixture.debugElement.injector.get(CartService);
    let spy = spyOn(cartService, 'removeCartItem');
    testHostComponent.cartItemCardComponent.remove();
    testHostFixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });


  @Component({
    selector: `host-component`,
    template: `<app-cart-item-card [cartItem]="item"></app-cart-item-card>`
  })
  class TestHostComponent {
    item = {
      product: {
        name: 'test product',
        id: 2,
        description: '',
        imageUrl: '',
        price: 100,
        year: '',
        productCategory: []
      },
      quantity: 2,
      total: 200
    }
    @ViewChild(CartItemCardComponent) public cartItemCardComponent: CartItemCardComponent;
  }

});
