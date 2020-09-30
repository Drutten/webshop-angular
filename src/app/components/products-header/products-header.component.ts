import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ICategory } from 'src/app/interfaces/i-category';
import { ICartItem } from 'src/app/interfaces/i-cart-item';
import { CartService } from 'src/app/services/cart.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.scss']
})
export class ProductsHeaderComponent implements OnInit, OnDestroy {
  shoppingCartIcon = faShoppingCart;
  userIcon = faUser;
  searchIcon = faSearch;
  caretDownIcon = faCaretDown;
  categorySubscription: Subscription;
  cartSubscription: Subscription;
  errorSubscription: Subscription;
  isFetchingSubscription: Subscription;
  loginSubscription: Subscription;
  categoryForm: FormGroup;
  searchForm: FormGroup;
  categories: ICategory[] = [];
  cartItems: ICartItem[] = [];
  errorMessage = '';
  isFetching = false;
  isOpen = false;
  isOpenDropdown = false;
  loggedIn = false;

  constructor(private categoryService: CategoryService,
    private productService: ProductService,
    private cartService: CartService,
    private loginService: LoginService,
    private router: Router) { }


  ngOnInit(): void {
    this.categorySubscription = this.categoryService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
    this.cartSubscription = this.cartService.cartItemsUpdated$.subscribe(cartItems => {
      this.cartItems = cartItems;
    });
    this.isFetchingSubscription = this.categoryService.isFetchingCategories$.subscribe(fetching => {
      this.isFetching = fetching;
    });
    this.errorSubscription = this.categoryService.categoryErrorText$.subscribe(message => {
      this.errorMessage = message;
    });
    this.loginSubscription = this.loginService.isLoggedIn$.subscribe(loggedIn => {
      this.loggedIn = loggedIn;
    });

    this.categoryService.getCategories();
    this.cartItems = this.cartService.getCartItems();
    this.loggedIn = this.loginService.getIsLoggedIn();
    this.categoryForm = new FormGroup({
      category: new FormControl(null)
    });
    this.searchForm = new FormGroup({
      inputText: new FormControl(null)
    })
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
    this.cartSubscription.unsubscribe();
    this.isFetchingSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.loginSubscription.unsubscribe();
  }

  getNumberOfProductsInCart(): number {
    let numProducts = 0;
    this.cartItems.forEach(item => {
      numProducts += item.quantity;
    });
    return numProducts;
  }


  onSelectCategory() {
    const value: number = this.categoryForm.value.category;
    // console.log(value);
    this.categoryForm.reset();
    this.productService.fetchProducts(value);
  }

  onSubmitSearch() {
    const text = this.searchForm.value.inputText;
    console.log(text);
    this.searchForm.reset();
    this.productService.fetchProductsBySearch(text);
  }

  onFetchAllProducts() {
    this.productService.fetchProducts();
  }

  handleToggledHamburger(isOpenMenu: boolean) {
    this.isOpen = isOpenMenu;
  }

  onToggleDropdown() {
    this.isOpenDropdown = !this.isOpenDropdown;
  }

  onLogOut() {
    this.loginService.logout();
    this.router.navigate(['']);
  }

}
