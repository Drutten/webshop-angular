import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should add cartItem', () => {
    expect(service.getCartItems().length).toBe(0);
    const product = {
      name: 'test product',
      id: 2,
      description: 'test',
      imageUrl: 'url2',
      price: 100,
      year: '2020',
      productCategory: []
    };

    service.addCartItem(product);
    expect(service.getCartItems().length).toBe(1);
  });


  it('should remove cartItem', () => {
    const addedProduct = {
      name: 'test product',
      id: 2,
      description: 'test',
      imageUrl: 'url2',
      price: 100,
      year: '2020',
      productCategory: []
    };

    service.addCartItem(addedProduct);
    expect(service.getCartItems().length).toBe(1);

    const cartItem = service.getCartItems()[0];
    service.removeCartItem(cartItem);
    expect(service.getCartItems().length).toBe(0);
  });


  it('should update quantity to be 2', () => {
    const addedProduct = {
      name: 'test product',
      id: 2,
      description: 'test',
      imageUrl: 'url2',
      price: 100,
      year: '2020',
      productCategory: []
    };
    service.addCartItem(addedProduct);
    expect(service.getCartItems()[0].quantity).toBe(1);

    const cartItem = service.getCartItems()[0];
    service.updateCartItem(cartItem, 1);
    expect(service.getCartItems()[0].quantity).toBe(2);
  });


  it('should update total to be 200', () => {
    const addedProduct = {
      name: 'test product',
      id: 2,
      description: 'test',
      imageUrl: 'url2',
      price: 100,
      year: '2020',
      productCategory: []
    };
    service.addCartItem(addedProduct);
    expect(service.getCartItems()[0].total).toBe(100);

    const cartItem = service.getCartItems()[0];
    service.updateCartItem(cartItem, 1);
    expect(service.getCartItems()[0].total).toBe(200);
  });


  it('should clear cart', () => {
    const addedProduct = {
      name: 'test product',
      id: 2,
      description: 'test',
      imageUrl: 'url2',
      price: 100,
      year: '2020',
      productCategory: []
    };
    service.addCartItem(addedProduct);
    expect(service.getCartItems().length).toBe(1);
    service.clearCart();
    expect(service.getCartItems().length).toBe(0);
  });
  
});
