import { Subject } from 'rxjs';
import { ICartItem } from '../interfaces/i-cart-item';
import { ICartService } from '../interfaces/i-cart-service';
import { IProduct } from '../interfaces/i-product';

export class CartServiceMock implements ICartService {
  private cartItems: ICartItem[] = [
    {
      product: {
        name: 'Kitty',
        id: 1,
        description: 'Kitty is a cat',
        imageUrl: 'url1',
        price: 100,
        year: '2020',
        productCategory: []
      },
      quantity: 1,
      total: 100
    },
    {
      product: {
        name: 'Pelle',
        id: 2,
        description: 'Pelle is a cat who lost his tail',
        imageUrl: 'url2',
        price: 150,
        year: '2010',
        productCategory: []
      },
      quantity: 1,
      total: 150
    }
  ];
  private cartItemsUpdated = new Subject<ICartItem[]>();
  cartItemsUpdated$ = this.cartItemsUpdated.asObservable();

  getCartItems(): ICartItem[] {
    return [...this.cartItems];
  }
  addCartItem(addedProduct: IProduct): void {}
}
