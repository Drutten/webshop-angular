import { Component, Input, OnInit } from '@angular/core';
import { ICartItem } from 'src/app/interfaces/i-cart-item';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-item-card',
  templateUrl: './cart-item-card.component.html',
  styleUrls: ['./cart-item-card.component.scss']
})
export class CartItemCardComponent implements OnInit {
  @Input() cartItem: ICartItem = {
    product: {
      name: '',
      id: 0,
      description: '',
      imageUrl: '',
      price: 0,
      year: '',
      productCategory: []
    },
    quantity: 0,
    total: 0
  }
  trashIcon = faTrash;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  // takes as an argument a number to add to quantity or negative number to subtract
  update(add: number) {
    this.cartService.updateCartItem(this.cartItem, add);
  }

  remove() {
    this.cartService.removeCartItem(this.cartItem);
  }

}
