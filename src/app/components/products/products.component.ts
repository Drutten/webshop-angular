import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/interfaces/i-product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: IProduct[] = [];
  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.subscription = this.productService.products$.subscribe((fetchedProducts: IProduct[]) => {
      console.log(fetchedProducts);
      this.products = fetchedProducts;
    });
    this.productService.fetchProducts();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
