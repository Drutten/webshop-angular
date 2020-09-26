import { Subject } from 'rxjs';
import { IProduct } from '../interfaces/i-product';
import { IProductService } from '../interfaces/i-product-service';

export class ProductServiceMock implements IProductService {
  private products = new Subject<IProduct[]>();
  products$ = this.products.asObservable();

  private isFetching = new Subject<boolean>();
  isFetching$ = this.isFetching.asObservable();
  private errorText = new Subject<string>();
  errorText$ = this.errorText.asObservable();

  private product = new Subject<IProduct>();
  product$ = this.product.asObservable();

  fetchProducts(category?: number): void {
    this.products.next([
      {id: 1, name: 'Kitty', description: 'Test movie 1', imageUrl: 'url1', price: 100, year: '2000', productCategory:[]},
      {id: 2, name: 'Molly', description: 'Test movie 2', imageUrl: 'url2', price: 100, year: '2000', productCategory:[]},
      {id: 3, name: 'Pelle', description: 'Test movie 3', imageUrl: 'url3', price: 100, year: '2000', productCategory:[]}
    ])
  }

  fetchProduct(id: number): void {
    this.product.next({id: 1, name: 'Kitty', description: 'Test movie 1', imageUrl: 'url1', price: 100, year: '2000', productCategory:[]});
  }
  
  fetchProductsBySearch(searchText: string): void {
    this.products.next([
      {id: 1, name: 'Kitty', description: 'Test movie 1', imageUrl: 'url1', price: 100, year: '2000', productCategory:[]},
      {id: 6, name: 'Kitty 2', description: 'Test movie 6', imageUrl: 'url6', price: 100, year: '2000', productCategory:[]},
      {id: 3, name: 'Pelle', description: 'Test movie 3', imageUrl: 'url3', price: 100, year: '2000', productCategory:[]}
    ]);
  }
}
