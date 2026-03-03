import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Products } from './Products';
import type { IProduct } from '../types/products';
import * as useProductsModule from '../hooks/useProducts';

// Mock del hook useProducts
vi.mock('../hooks/useProducts');

// Mock del store
vi.mock('../store/products', () => ({
  useProductsStore: vi.fn((selector) => {
    const state = {
      addProduct: vi.fn(),
      removeProduct: vi.fn(),
    };
    return selector(state);
  }),
}));

describe('Products', () => {
  const mockProducts: IProduct[] = [
    {
      id: 1,
      title: 'Producto 1',
      price: 100,
      category: 'Cuenta',
      image: '/test-image-1.png',
    },
    {
      id: 2,
      title: 'Producto 2',
      price: 200,
      category: 'Crédito',
      image: '/test-image-2.png',
    },
  ];

  const defaultMockReturn = {
    loading: false,
    fetchProducts: vi.fn(),
    products: [],
    openCart: false,
    handleOpenCart: vi.fn(),
    handleCloseCart: vi.fn(),
    loadingCart: false,
    cartProducts: [],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useProductsModule.useProducts).mockReturnValue(defaultMockReturn);
  });

  it('debe renderizar el título "Productos"', () => {
    render(<Products />);
    
    expect(screen.getByText('Productos')).toBeInTheDocument();
  });

  it('debe llamar fetchProducts en el montaje', () => {
    const mockFetchProducts = vi.fn();
    
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      fetchProducts: mockFetchProducts,
    });

    render(<Products />);
    
    expect(mockFetchProducts).toHaveBeenCalledTimes(1);
  });

  it('debe mostrar productos cargados', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      products: mockProducts,
    });

    render(<Products />);
    
    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Producto 2')).toBeInTheDocument();
  });

  it('debe mostrar skeletons cuando está cargando', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      loading: true,
    });

    const { container } = render(<Products />);
    
    const loadingCards = container.querySelectorAll('.ant-card-loading');
    expect(loadingCards.length).toBe(5);
  });

  it('no debe mostrar skeletons cuando no está cargando', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      products: mockProducts,
    });

    const { container } = render(<Products />);
    
    const loadingCards = container.querySelectorAll('.ant-card-loading');
    expect(loadingCards.length).toBe(0);
  });

  it('debe renderizar el grid con la estructura correcta', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      products: mockProducts,
    });

    const { container } = render(<Products />);
    
    const grid = container.querySelector('.grid');
    expect(grid).toBeInTheDocument();
    expect(grid?.classList.contains('grid-cols-1')).toBe(true);
  });
});
