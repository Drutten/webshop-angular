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
  isFetching = false;
  errorMessage = '';
  productsSubscription: Subscription;
  errorSubscription: Subscription;
  isFetchingSubscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productsSubscription = this.productService.products$.subscribe(
      (products) => {
        this.products = products;
      }
    );
    this.errorSubscription = this.productService.errorText$.subscribe(
      (message) => {
        this.errorMessage = message;
      }
    );
    this.isFetchingSubscription = this.productService.isFetching$.subscribe(
      (fetching) => {
        this.isFetching = fetching;
      }
    )
    this.productService.fetchProducts();
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
    this.errorSubscription.unsubscribe();
    this.isFetchingSubscription.unsubscribe();
  }

}
