import { Component, OnDestroy, OnInit } from '@angular/core';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/i-cart-item';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  shoppingCartIcon = faShoppingCart;
  userIcon = faUser;
  caretDownIcon = faCaretDown;
  isOpen = false;
  isOpenDropdown = false;
  cartItems: ICartItem[] = [];

  constructor(private cartService: CartService) { }


  ngOnInit(): void {
    this.cartSubscription = this.cartService.cartItemsUpdated$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
    this.cartItems = this.cartService.getCartItems();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }


  handleToggledHamburger(isOpenMenu: boolean) {
    this.isOpen = isOpenMenu;
  }

  onToggleDropdown() {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

}
