import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ICartItem } from 'src/app/interfaces/i-cart-item';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartSubscription: Subscription;
  loginSubscription: Subscription;
  shoppingCartIcon = faShoppingCart;
  userIcon = faUser;
  caretDownIcon = faCaretDown;
  isOpen = false;
  isOpenDropdown = false;
  loggedIn = false;
  cartItems: ICartItem[] = [];

  constructor(private cartService: CartService,
    private loginService: LoginService,
    private router: Router) { }


  ngOnInit(): void {
    this.loginSubscription = this.loginService.isLoggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });
    this.cartSubscription = this.cartService.cartItemsUpdated$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
    this.cartItems = this.cartService.getCartItems();
    this.loggedIn = this.loginService.getIsLoggedIn();
  }

  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }


  handleToggledHamburger(isOpenMenu: boolean) {
    this.isOpen = isOpenMenu;
  }

  onToggleDropdown() {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  getNumberOfProductsInCart(): number {
    let numProducts = 0;
    this.cartItems.forEach(item => {
      numProducts += item.quantity;
    });
    return numProducts;
  }

  onLogOut() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

}
