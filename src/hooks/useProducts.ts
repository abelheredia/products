import { useState } from 'react';
import { PRODUCTS_DATA } from '../mock/products';
import type { IProduct } from '../types/products';
import { useProductsStore } from '../store/products';
import { useForm } from 'react-hook-form';

export const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [openCart, setOpenCart] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const filterProductForm = useForm({
    defaultValues: {
      description: '',
      category: ''
    }
  });
  const cartProducts = useProductsStore((state) => state.cartProducts);

  const fetchProducts = async () => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setProducts(PRODUCTS_DATA);
    setLoading(false);
  };

  const handleOpenCart = () => {
    setOpenCart(true);
    fetchCartProducts();
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const fetchCartProducts = () => {
    setLoadingCart(true);
    setTimeout(() => {
      setLoadingCart(false);
    }, 1000);
  };

  const filterProducts = () => {
    let filtered = PRODUCTS_DATA;
    const { description, category } = filterProductForm.getValues();
    if (description) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(description.toLowerCase())
      );
    }

    if (category) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    setProducts(filtered);
    setOpenFilter(false);
  };

  const resetFilters = () => {
    filterProductForm.reset();
    setProducts(PRODUCTS_DATA);
    setOpenFilter(false);
  };

  return {
    loading,
    fetchProducts,
    products,
    openCart,
    handleOpenCart,
    loadingCart,
    handleCloseCart,
    cartProducts,
    filterProductForm,
    openFilter,
    handleOpenFilter,
    handleCloseFilter,
    filterProducts,
    resetFilters
  };
};
