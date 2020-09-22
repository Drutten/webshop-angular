import { ICartItem } from './i-cart-item';
import { IProduct } from './i-product';

export interface ICartService {
  getCartItems(): ICartItem[];
  addCartItem(addedProduct: IProduct): void;
}
