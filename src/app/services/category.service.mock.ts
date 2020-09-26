import { Subject } from 'rxjs';
import { ICategory } from '../interfaces/i-category';
import { ICategoryService } from '../interfaces/i-category-service';

export class CategoryServiceMock implements ICategoryService {
  private categories = new Subject<ICategory[]>();
  categories$ = this.categories.asObservable();
  private isFetchingCategories = new Subject<boolean>();
  isFetchingCategories$ = this.isFetchingCategories.asObservable();
  private errorText = new Subject<string>();
  categoryErrorText$ = this.errorText.asObservable();

  getCategories(): void {
    this.categories.next([
      {id: 1, name: 'Action'},
      {id: 2, name: 'Comedy'},
      {id: 3, name: 'Thriller'}
    ])
  }
}
