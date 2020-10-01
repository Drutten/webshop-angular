import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { CartService } from 'src/app/services/cart.service';
import { CartServiceMock } from 'src/app/services/cart.service.mock';
import { ProductService } from 'src/app/services/product.service';
import { ProductServiceMock } from 'src/app/services/product.service.mock';

import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        {provide: ProductService, useClass: ProductServiceMock},
        {provide: CartService, useClass: CartServiceMock}
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an id of 1', () => {
    expect(component.product.id).toBe(1);
  });

  it('should set #isInCart to true when id of product is found in cart', () => {
    expect(component.isInCart).toBe(true);
  });

  it('should call service method #addCartItem when calling #addToCart', () => {
    const cartService = fixture.debugElement.injector.get(CartService);
    const spy = spyOn(cartService, 'addCartItem');
    component.addToCart();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

});
