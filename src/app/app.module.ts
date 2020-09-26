import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AdminComponent } from './components/admin/admin.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrdersComponent } from './components/orders/orders.component';
import { OrderStartComponent } from './components/order-start/order-start.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { HamburgerComponent } from './components/hamburger/hamburger.component';
import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { CartItemCardComponent } from './components/cart-item-card/cart-item-card.component';




@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CartComponent,
    ProductDetailComponent,
    NotFoundComponent,
    CheckoutComponent,
    AdminComponent,
    HeaderComponent,
    LoginComponent,
    OrderItemComponent,
    OrderDetailComponent,
    OrdersComponent,
    OrderStartComponent,
    ProductCardComponent,
    HamburgerComponent,
    ProductsHeaderComponent,
    CartItemCardComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatBadgeModule,
    MatFormFieldModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
