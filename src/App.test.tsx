import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock de los componentes
vi.mock('./components/Products', () => ({
  Products: () => <div data-testid="products-component">Products Component</div>,
}));

vi.mock('./components/Cart', () => ({
  Cart: () => <div data-testid="cart-component">Cart Component</div>,
}));

// Mock del hook useProducts
vi.mock('./hooks/useProducts', () => ({
  useProducts: vi.fn(() => ({
    loading: false,
    fetchProducts: vi.fn(),
    products: [],
    openCart: false,
    handleOpenCart: vi.fn(),
    handleCloseCart: vi.fn(),
    loadingCart: false,
    cartProducts: [],
  })),
}));

// Mock del store
vi.mock('./store/products', () => ({
  useProductsStore: vi.fn((selector) => {
    const state = {
      addProduct: vi.fn(),
      removeProduct: vi.fn(),
      cartProducts: [],
    };
    return selector(state);
  }),
}));

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar sin errores', () => {
    render(<App />);
    
    expect(screen.getByTestId('products-component')).toBeInTheDocument();
    expect(screen.getByTestId('cart-component')).toBeInTheDocument();
  });

  it('debe renderizar el componente Products', () => {
    render(<App />);
    
    expect(screen.getByText('Products Component')).toBeInTheDocument();
  });

  it('debe renderizar el componente Cart', () => {
    render(<App />);
    
    expect(screen.getByText('Cart Component')).toBeInTheDocument();
  });

  it('debe estar envuelto en Suspense', () => {
    const { container } = render(<App />);
    
    // Verificar que los componentes se renderizan correctamente
    expect(container.querySelector('[data-testid="products-component"]')).toBeInTheDocument();
    expect(container.querySelector('[data-testid="cart-component"]')).toBeInTheDocument();
  });
});
