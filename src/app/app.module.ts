import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
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
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
