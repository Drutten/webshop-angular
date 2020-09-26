import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from 'src/app/services/cart.service';
import { CartServiceMock } from 'src/app/services/cart.service.mock';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {

  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent, TestHostComponent ],
      providers: [{provide: CartService, useClass: CartServiceMock}]
    })
    .compileComponents();
  });


  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });


  it('should have 100 as price', () => {
    testHostFixture.detectChanges();
    expect(testHostComponent.productCardComponent.product.price).toBe(100);
  });

  it('should display Test as name', () => {
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('.product-name').innerText).toEqual('Test');
  });

  it('should call service method #addCartItem when calling #addToCart', () => {
    const cartService = testHostFixture.debugElement.injector.get(CartService);
    const spy = spyOn(cartService, 'addCartItem');
    testHostComponent.productCardComponent.addToCart();
    testHostFixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should have an id of 1', () => {
    testHostFixture.detectChanges();
    expect(testHostComponent.productCardComponent.product.id).toBe(1);
  })

  it('#isInCart should be true when product with id 1 found in cart', () => {
    const cartService = testHostFixture.debugElement.injector.get(CartService);
    testHostComponent.productCardComponent.setIsInCart(cartService.getCartItems());
    testHostFixture.detectChanges();
    expect(testHostComponent.productCardComponent.isInCart).toBe(true);
  })



  @Component({
    selector: `host-component`,
    template: `<app-product-card [product]="product"></app-product-card>`
  })
  class TestHostComponent {
    product = {
      name: 'Test',
      id: 1,
      description: 'A test',
      imageUrl: 'Url1',
      price: 100,
      year: '2000',
      productCategory: []
    }
    @ViewChild(ProductCardComponent) public productCardComponent: ProductCardComponent;
  }

});

