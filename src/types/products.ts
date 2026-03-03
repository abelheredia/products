export interface IProduct {
  id: number;
  title: string;
  price: number;
  category: ProductCategory;
  image: string;
}

export const ProductCategory = {
  ACCOUNT: 'Cuenta',
  CARD: 'Tarjeta',
  CREDIT: 'Crédito'
} as const;

export type ProductCategory =
  (typeof ProductCategory)[keyof typeof ProductCategory];
