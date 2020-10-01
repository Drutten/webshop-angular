import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CartService } from 'src/app/services/cart.service';
import { CartServiceMock } from 'src/app/services/cart.service.mock';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [RouterTestingModule],
      providers: [{provide: CartService, useClass: CartServiceMock}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be 2 different items in cartItems', () => {
    expect(component.cartItems.length).toBe(2);
  });

  it('should be 3 products totally in cartItems', () => {
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
  })
});
