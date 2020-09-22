import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory } from '../interfaces/i-category';
import { ICategoryService } from '../interfaces/i-category-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements ICategoryService{
  private categories = new Subject<ICategory[]>();
  categories$ = this.categories.asObservable();
  private isFetchingCategories = new Subject<boolean>();
  isFetchingCategories$ = this.isFetchingCategories.asObservable();
  private errorText = new Subject<string>();
  categoryErrorText$ = this.errorText.asObservable();

  constructor(private http: HttpClient) { }

  getCategories(): void {
    this.isFetchingCategories.next(true);
    this.errorText.next('');
    this.http.get<ICategory[]>('https://medieinstitutet-wie-products.azurewebsites.net/api/categories')
    .pipe(map(categories => categories.filter(category => category.name)))
    .subscribe(categories => {
      this.isFetchingCategories.next(false);
      this.categories.next(categories);
    }, error => {
      console.log(error.status);
      this.isFetchingCategories.next(false);
      this.errorText.next('Kategorier kunde inte hämtas');
    })
  }
}
