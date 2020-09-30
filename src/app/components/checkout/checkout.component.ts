import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/i-cart-item';
import { IOrder } from 'src/app/interfaces/i-order';
import { IOrderRow } from 'src/app/interfaces/i-order-row';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { COMPANY_ID } from 'src/app/shared/constants';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart: ICartItem[] = [];
  form: FormGroup;
  radioButtonValues: string[] = ['Visa', 'Mastercard', 'Faktura'];
  isSuccessful = false;
  error = '';
  cartSubscription: Subscription;
  isSuccessfulSubscription: Subscription;
  errorSubscription: Subscription;

  constructor(private orderService: OrderService,
    private cartService: CartService) { }

  ngOnInit(): void {
    this.isSuccessfulSubscription = this.orderService.isSuccessful$.subscribe(successful => {
      this.isSuccessful = successful;
      if(successful) {
        this.cartService.clearCart();
      }
    });
    this.errorSubscription = this.orderService.errorMessage$.subscribe(message => {
      this.error = message;
    });
    this.cartSubscription = this.cartService.cartItemsUpdated$.subscribe(cartItems => {
      this.cart = cartItems;
    });
    this.cart = this.cartService.getCartItems();
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      payment: new FormControl('Visa')
    });
    //this.orderService.fetchOrders();
  }

  ngOnDestroy() {
    this.isSuccessfulSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

  onCreateOrder() {
    const newOrder = {
      companyId: COMPANY_ID,
      created: new Date().toUTCString(),
      createdBy: this.form.value.email,
      paymentMethod: this.form.value.payment,
      totalPrice: this.calculateTotalPrice(),
      status: 2,
      orderRows: this.getOrderRows()
    };
    this.form.reset();
    this.sendOrder(newOrder);
  }

  sendOrder(order: IOrder) {
    this.orderService.postOrder(order);
  }


  calculateTotalPrice(): number {
    let total = 0;
    this.cart.forEach(item => {
      total += item.total;
    });
    return total;
  }

  getOrderRows(): IOrderRow[] {
    const orderRows: IOrderRow[] = this.cart.map(item => {
      return {productId: item.product.id, amount: item.quantity};
    });
    return orderRows;
  }

  // del() {
  //   this.orderService.deleteOrder(6178);
  // }

}
