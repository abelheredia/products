import { persist } from 'zustand/middleware';
import { type StateCreator, create } from 'zustand';
import type { IProduct } from '../types/products';

interface ProductsState {
  cartProducts: { product: IProduct; count: number }[];
  addProduct: (product: IProduct) => void;
  removeProduct: (id: number) => void;
  deleteProduct: (id: number) => void;
}

const storeApi: StateCreator<ProductsState> = (set) => ({
  cartProducts: [],

  addProduct: (product) =>
    set((state) => {
      const existing = state.cartProducts.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return {
          cartProducts: state.cartProducts.map((item) =>
            item.product.id === product.id
              ? { ...item, count: item.count + 1 }
              : item
          )
        };
      }

      return {
        cartProducts: [...state.cartProducts, { product, count: 1 }]
      };
    }),

  removeProduct: (id) =>
    set((state) => {
      const existing = state.cartProducts.find(
        (item) => item.product.id === id
      );

      if (!existing) {
        return state;
      }

      if (existing.count > 1) {
        return {
          cartProducts: state.cartProducts.map((item) =>
            item.product.id === id ? { ...item, count: item.count - 1 } : item
          )
        };
      }

      return {
        cartProducts: state.cartProducts.filter(
          (item) => item.product.id !== id
        )
      };
    }),

  deleteProduct: (id) =>
    set((state) => ({
      cartProducts: state.cartProducts.filter((item) => item.product.id !== id)
    }))
});

export const useProductsStore = create<ProductsState>()(
  persist(storeApi, { name: 'products' })
);
