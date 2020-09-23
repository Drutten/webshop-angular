import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/i-cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cart: ICartItem[] = [];
  cartSubscription: Subscription;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItemsUpdated$
    .subscribe(cartItems => {
      this.cart = cartItems;
    });
    this.cart = this.cartService.getCartItems();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  getCartTotal(): number {
    let cartTotal = 0;
    this.cart.forEach(item => {
      cartTotal += item.total;
    })
    return cartTotal;
  }

}
