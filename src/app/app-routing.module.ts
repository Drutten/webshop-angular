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
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginGuard } from './services/login-guard.service';

const routes: Routes = [
  { path: 'produkter/:id', component: ProductDetailComponent },
  { path: 'produkter', component: ProductsComponent },
  { path: 'varukorg', component: CartComponent },
  { path: 'kassan', component: CheckoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate:[LoginGuard],
    children: [
      { path: 'ordrar', component: OrdersComponent,
        children: [
          { path: ':id', component: OrderDetailComponent },
          { path: '', component: OrderStartComponent, pathMatch: 'full' }
        ]
      },
      { path: '', redirectTo: 'ordrar', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: '/produkter', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
