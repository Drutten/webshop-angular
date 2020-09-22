import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ICartItem } from '../interfaces/i-cart-item';
import { ICartService } from '../interfaces/i-cart-service';
import { IProduct } from '../interfaces/i-product';

@Injectable({
  providedIn: 'root'
})
export class CartService implements ICartService{
  private cartItems: ICartItem[] = [
    {
      product: {
        name: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        id: 1,
        description: 'Kitty is a cat',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTkxYjUxNDYtZGY0My00NTc2LThiZmYtNmNmNmU0NGVkZWYwXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
        price: 100,
        year: '2020',
        productCategory: []
      },
      quantity: 1,
      total: 100
    },
    {
      product: {
        name: 'Pelle',
        id: 2,
        description: 'Pelle is a cat who lost his tail',
        imageUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYjJiZjMzYzktNjU0NS00OTkxLWEwYzItYzdhYWJjN2QzMTRlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
        price: 150,
        year: '2010',
        productCategory: []
      },
      quantity: 1,
      total: 150
    }
  ];
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


  removeCartItem(removedItem: ICartItem) {
    const updatedCartItems = [...this.cartItems];
    let index = -1;
    updatedCartItems.forEach((item, idx) => {
      if(item.product.id === removedItem.product.id) {
        index = idx;
      }
    });
    if(index > -1) {
      updatedCartItems.splice(index, 1);
      this.cartItems = updatedCartItems;
      this.cartItemsUpdated.next([...this.cartItems]);
    }
  }
}
