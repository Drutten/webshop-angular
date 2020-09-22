import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/i-cart-item';
import { IProduct } from 'src/app/interfaces/i-product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: IProduct;
  isInCart: boolean = false;
  isFetching = false;
  errorMessage = '';
  productSubscription: Subscription;
  errorSubscription: Subscription;
  isFetchingSubscription: Subscription;
  cartSubscription: Subscription;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.productSubscription = this.productService.product$.subscribe(product => {
      this.product = product;
      this.setIsInCart(this.cartService.getCartItems());
    });
    this.isFetchingSubscription = this.productService.isFetching$.subscribe(fetching => {
      this.isFetching = fetching;
    });
    this.errorSubscription = this.productService.errorText$.subscribe(message => {
      this.errorMessage = message;
    });
    this.cartSubscription = this.cartService.cartItemsUpdated$.subscribe(cartItems => {
      this.setIsInCart(cartItems);
    });
    this.route.params.subscribe((params: Params) => {
      this.productService.fetchProduct(+params.id);
    });

  }

  ngOnDestroy(): void {
    this.productSubscription.unsubscribe();
    this.isFetchingSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
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
