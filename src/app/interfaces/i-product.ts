export interface IProduct {
  name: string;
  id: number;
  description: string;
  imageUrl: string;
  price: number;
  year: string;
  productCategory: {categoryId: number}[];
}
