import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/services/cart.service';
import { CartServiceMock } from 'src/app/services/cart.service.mock';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryServiceMock } from 'src/app/services/category.service.mock';
import { ProductService } from 'src/app/services/product.service';
import { ProductServiceMock } from 'src/app/services/product.service.mock';

import { ProductsHeaderComponent } from './products-header.component';

describe('ProductsHeaderComponent', () => {
  let component: ProductsHeaderComponent;
  let fixture: ComponentFixture<ProductsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsHeaderComponent ],
      imports: [RouterTestingModule],
      providers: [
        {provide: CategoryService, useClass: CategoryServiceMock},
        {provide: ProductService, useClass: ProductServiceMock},
        {provide: CartService, useClass: CartServiceMock}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get categories when loading', () => {
    expect(component.categories.length).toBe(3);
  });

  it('should be 2 different items in #cartItems', () => {
    expect(component.cartItems.length).toBe(2);
  });

  it('should be 3 products in total in cartItems', () => {
    const numProducts = component.getNumberOfProductsInCart();
    expect(numProducts).toBe(3);
  });

  it('should toggle #isOpenDropdown when running #onToggleDropdown', () => {
    expect(component.isOpenDropdown).toBe(false);
    component.onToggleDropdown();
    fixture.detectChanges();
    expect(component.isOpenDropdown).toBe(true);
    component.onToggleDropdown();
    fixture.detectChanges();
    expect(component.isOpenDropdown).toBe(false);
  });

  it('should set #isOpen when #handleToggleHamburger is called', () => {
    expect(component.isOpen).toBe(false);
    component.handleToggledHamburger(true);
    expect(component.isOpen).toBe(true);
  });

  it('should call #fetchProducts in #ProductService when #onSelectCategory runs', () => {
    let productService = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(productService, 'fetchProducts');
    component.onSelectCategory();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('should call #fetchProductsBySearch in #ProductService when #onSubmitSearch runs', () => {
    let productService = fixture.debugElement.injector.get(ProductService);
    let spy = spyOn(productService, 'fetchProductsBySearch');
    component.onSubmitSearch();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  })
});
