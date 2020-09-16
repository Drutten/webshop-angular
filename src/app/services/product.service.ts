import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IProduct } from '../interfaces/i-product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = new Subject<IProduct[]>();
  products$ = this.products.asObservable();

  constructor(private http: HttpClient) { }

  fetchProducts(): void {
    this.http.get<IProduct[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/products')
    .subscribe((products: IProduct[]) => {
      // de 32 första eftersom det kan smyga sig in oönskade post i det här api:et ;)
      this.products.next(products.slice(0, 32));
    });
  }
}
