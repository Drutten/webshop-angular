import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderStartComponent } from './components/order-start/order-start.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'orders', component: OrdersComponent,
        children: [
          { path: ':id', component: OrderDetailComponent },
          { path: '', component: OrderStartComponent, pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
