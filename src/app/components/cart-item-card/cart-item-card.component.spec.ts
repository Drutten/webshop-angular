// import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemCardComponent } from './cart-item-card.component';

describe('CartItemCardComponent', () => {
  let component: CartItemCardComponent;
  let fixture: ComponentFixture<CartItemCardComponent>;
  // let testHostComponent: TestHostComponent;
  // let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemCardComponent ]
    })
    .compileComponents();
  });

  // istället för förra
  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [ CartItemCardComponent, TestHostComponent ]
  //   })
  //   .compileComponents();
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // istället för förra
  // beforeEach(() => {
  //   testHostFixture = TestBed.createComponent(TestHostComponent);
  //   testHostComponent = testHostFixture.componentInstance;
  //   testHostFixture.detectChanges();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should display 1 as quantity', () => {
  //   testHostComponent.cartItemCardComponent.cartItem = {
  //     product: {
  //       name: 'test product',
  //       id: 2,
  //       description: '',
  //       imageUrl: '',
  //       price: 100,
  //       year: '',
  //       productCategory: []
  //     },
  //     quantity: 1,
  //     total: 100
  //   }
  //   testHostFixture.detectChanges();
  //   expect(testHostFixture.nativeElement.querySelector('.quantity')
  //   .innerText).toEqual('1');
  // })

  // @Component({
  //   selector: `host-component`,
  //   template: `<app-cart-item-card></app-cart-item-card>`
  // })
  // class TestHostComponent {
  //   @ViewChild(CartItemCardComponent) cartItemCardComponent: CartItemCardComponent
  // }

});
