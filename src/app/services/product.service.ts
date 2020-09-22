import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { IProduct } from '../interfaces/i-product';
import { IProductService } from '../interfaces/i-product-service';

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
    this.http.get<IProduct[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products')
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
      console.log(error.status);
      this.isFetching.next(false);
      this.errorText.next(this.getErrorMessage(error.status));
    });
  }


  fetchProduct(id: number) {
    this.isFetching.next(true);
    this.errorText.next('');
    this.http.get<IProduct>(`https://medieinstitutet-wie-products.azurewebsites.net/api/products/${id}`)
    .subscribe(product => {
      this.isFetching.next(false);
      this.product.next(product);
    }, error => {
      this.isFetching.next(false);
      this.errorText.next(this.getErrorMessage(error.status));
    });
  }



  fetchProductsBySearch(searchText: string) {
    this.isFetching.next(true);
    this.errorText.next('');
    this.http.get<IProduct[]>(`https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=${searchText}`)
    .pipe(map(products => products.filter(product => product.price > 0)))
    .subscribe(products => {
      this.isFetching.next(false);
      this.products.next(products);
    }, error => {
      // console.log(error.status);
      this.isFetching.next(false);
      this.errorText.next(this.getErrorMessage(error.status));
    })
  }





  // Hjälpmetoder
  private getErrorMessage(statusCode: number): string {
    let text = '';
    switch(statusCode) {
      case 400: text = `Statuskod 400. Felaktig begäran från klienten`;
      break;
      case 404: text = `Statuskod 404. Varan kunde inte hittas`;
      break;
      case 500: text = `Statuskod 500. Internt serverfel. Försök igen lite senare`;
      break;
      case 0: text = `Statuskod 0. Okänt fel. Försök igen lite senare`;
      break;
      default: text = `Statuskod ${statusCode}.`;
    }
    return text;
  }
}
