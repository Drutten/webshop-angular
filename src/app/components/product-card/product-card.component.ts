import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/i-cart-item';
import { IProduct } from 'src/app/interfaces/i-product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
  @Input() product: IProduct;
  
  cartSubscription: Subscription;
  isInCart = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItemsUpdated$.subscribe(cartItems => {
      this.setIsInCart(cartItems);
    });
    this.setIsInCart(this.cartService.getCartItems());
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }

  addToCart() {
    this.cartService.addCartItem(this.product);
  }

  setIsInCart(cart: ICartItem[]): void {
    this.isInCart = false;
    cart.forEach(item => {
      if(this.product.id === item.product.id) {
        this.isInCart = true;
      }
    });
  }

}
