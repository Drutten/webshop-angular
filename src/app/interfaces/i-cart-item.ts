import { IProduct } from './i-product';

export interface ICartItem {
  product: IProduct;
  quantity: number;
  total: number;
}
