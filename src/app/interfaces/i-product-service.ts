export interface IProductService {
  fetchProducts(category?: number): void;
  fetchProduct(id: number): void;
  fetchProductsBySearch(searchText: string): void;
}
