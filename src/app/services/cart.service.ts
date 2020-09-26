import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICartItem } from '../interfaces/i-cart-item';
import { ICartService } from '../interfaces/i-cart-service';
import { IProduct } from '../interfaces/i-product';

@Injectable({
  providedIn: 'root'
})
export class CartService implements ICartService{
  private cartItems: ICartItem[] = [];
  private cartItemsUpdated = new Subject<ICartItem[]>();
  cartItemsUpdated$ = this.cartItemsUpdated.asObservable();

  constructor() { }

  getCartItems() {
    return [...this.cartItems];
  }

  addCartItem(addedProduct: IProduct) {
    const newCartItem: ICartItem = {
      product: addedProduct,
      quantity: 1,
      total: addedProduct.price
    }
    this.cartItems.push(newCartItem);
    this.cartItemsUpdated.next([...this.cartItems]);
  }


  removeCartItem(itemToRemove: ICartItem) {
    const updatedCartItems = [...this.cartItems];
    let index = -1;
    updatedCartItems.forEach((item, idx) => {
      if(item.product.id === itemToRemove.product.id) {
        index = idx;
      }
    });
    if(index > -1) {
      updatedCartItems.splice(index, 1);
      this.cartItems = updatedCartItems;
      this.cartItemsUpdated.next([...this.cartItems]);
    }
  }


  updateCartItem(itemToUpdate: ICartItem, num: number) {
    const newQuantity = itemToUpdate.quantity + num;
    if(newQuantity <= 0) {
      this.removeCartItem(itemToUpdate);
    }
    else {
      const updatedCartItems: ICartItem[] = [...this.cartItems];
      const newTotal = itemToUpdate.product.price * newQuantity;
      const updatedCartItem: ICartItem = {
          product: itemToUpdate.product,
          quantity: newQuantity,
          total: newTotal
      }
      updatedCartItems.forEach((item, idx) => {
        if (item.product.id === itemToUpdate.product.id) {
          // Replace
          updatedCartItems.splice(idx, 1, updatedCartItem);
        }
      });
      this.cartItems = updatedCartItems;
      this.cartItemsUpdated.next([...this.cartItems]);
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsUpdated.next([...this.cartItems]);
  }

}
