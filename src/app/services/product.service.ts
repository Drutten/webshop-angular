import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from '../interfaces/i-product';
import { IProductService } from '../interfaces/i-product-service';
import { API_PRODUCTS_ENDPOINT, API_SEARCH_ENDPOINT } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService implements IProductService {
  private products = new Subject<IProduct[]>();
  products$ = this.products.asObservable();
  private isFetching = new Subject<boolean>();
  isFetching$ = this.isFetching.asObservable();
  private errorText = new Subject<string>();
  errorText$ = this.errorText.asObservable();

  private product = new Subject<IProduct>();
  product$ = this.product.asObservable();


  constructor(private http: HttpClient) { }


  fetchProducts(category = 0): void {
    this.isFetching.next(true);
    this.errorText.next('');
    this.http.get<IProduct[]>(API_PRODUCTS_ENDPOINT)
    .pipe(
      map(products => products.filter(product => product.price > 0)),
      map(products => {
        const filteredProducts = [];
        products.forEach(product => {
          if(category) {
            product.productCategory.forEach(item => {
              if(item.categoryId === category) {
                filteredProducts.push(product);
              }
            })
          }
          else {
            filteredProducts.push(product);
          }
        })
        return filteredProducts;
      })
    )
    .subscribe(products => {
      this.isFetching.next(false);
      this.products.next(products);
    }, error => {
      console.log(error);
      this.isFetching.next(false);
      this.errorText.next((error.status)? this.getErrorMessage(error.status) : 'Försök igen lite senare');
    });
  }


  fetchProduct(id: number) {
    this.isFetching.next(true);
    this.errorText.next('');
    this.http.get<IProduct>(`${API_PRODUCTS_ENDPOINT}/${id}`)
    .subscribe(product => {
      this.isFetching.next(false);
      this.product.next(product);
    }, error => {
      this.isFetching.next(false);
      this.errorText.next((error.status)? this.getErrorMessage(error.status) : 'Försök igen lite senare');
    });
  }



  fetchProductsBySearch(searchText: string) {
    this.isFetching.next(true);
    this.errorText.next('');
    this.http.get<IProduct[]>(`${API_SEARCH_ENDPOINT}?searchText=${searchText}`)
    .pipe(map(products => products.filter(product => product.price > 0)))
    .subscribe(products => {
      this.isFetching.next(false);
      this.products.next(products);
    }, error => {
      console.log(error);
      this.isFetching.next(false);
      this.errorText.next((error.status) ? this.getErrorMessage(error.status) : 'Försök igen lite senare');
    })
  }



  private getErrorMessage(status: number): string {
    let text = '';
    switch(status) {
      case 400: text = `Felaktig begäran från klienten`;
      break;
      case 404: text = `Varan kunde inte hittas`;
      break;
      case 500: text = `Internt serverfel. Försök igen lite senare`;
      break;
      default: text = `Försök igen lite senare`;
    }
    return text;
  }
}
