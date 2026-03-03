import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Cart } from './Cart';
import type { IProduct } from '../types/products';
import * as useProductsModule from '../hooks/useProducts';

// Mock del hook useProducts
vi.mock('../hooks/useProducts');

// Mock del store
vi.mock('../store/products', () => ({
  useProductsStore: vi.fn((selector) => {
    const state = {
      addProduct: vi.fn(),
      removeProduct: vi.fn()
    };
    return selector(state);
  })
}));

describe('Cart', () => {
  const mockProduct: IProduct = {
    id: 1,
    title: 'Producto 1',
    price: 100,
    category: 'Cuenta',
    image: '/test-image.png'
  };

  const defaultMockReturn = {
    openCart: false,
    handleOpenCart: vi.fn(),
    handleCloseCart: vi.fn(),
    loadingCart: false,
    cartProducts: [],
    loading: false,
    fetchProducts: vi.fn(),
    products: []
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useProductsModule.useProducts).mockReturnValue(defaultMockReturn);
  });

  it('debe renderizar el FloatButton', () => {
    render(<Cart />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('debe mostrar el badge con el conteo correcto', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      cartProducts: [
        { product: mockProduct, count: 2 },
        { product: { ...mockProduct, id: 2 }, count: 3 }
      ]
    });

    const { container } = render(<Cart />);

    const badge = container.querySelector('.ant-badge-count');
    expect(badge?.textContent).toBe('5');
  });

  it('debe llamar handleOpenCart al hacer clic en el FloatButton', async () => {
    const user = userEvent.setup();
    const mockHandleOpenCart = vi.fn();

    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      handleOpenCart: mockHandleOpenCart
    });

    render(<Cart />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockHandleOpenCart).toHaveBeenCalled();
  });

  it('debe mostrar el drawer cuando openCart es true', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      openCart: true
    });

    render(<Cart />);

    expect(screen.getByText('Carrito de Productos')).toBeInTheDocument();
  });

  it('debe mostrar los totales correctamente', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      openCart: true,
      cartProducts: [
        { product: mockProduct, count: 2 },
        { product: { ...mockProduct, id: 2, price: 200 }, count: 1 }
      ]
    });

    render(<Cart />);

    expect(screen.getByText('Total de items: 3')).toBeInTheDocument();
    expect(screen.getByText('Total: 400')).toBeInTheDocument();
  });

  it('debe mostrar mensaje cuando el carrito está vacío', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      openCart: true,
      cartProducts: []
    });

    render(<Cart />);

    expect(
      screen.getByText('No hay productos en el carrito')
    ).toBeInTheDocument();
  });

  it('debe mostrar productos en loading cuando loadingCart es true', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      openCart: true,
      loadingCart: true
    });

    const { container } = render(<Cart />);

    // Verificar que el drawer está abierto y no muestra el mensaje de vacío
    expect(screen.getByText('Carrito de Productos')).toBeInTheDocument();
    expect(
      screen.queryByText('No hay productos en el carrito')
    ).not.toBeInTheDocument();
  });

  it('debe renderizar los productos del carrito', () => {
    vi.mocked(useProductsModule.useProducts).mockReturnValue({
      ...defaultMockReturn,
      openCart: true,
      cartProducts: [{ product: mockProduct, count: 2 }]
    });

    render(<Cart />);

    expect(screen.getByText('Producto 1')).toBeInTheDocument();
    expect(screen.getByText('Cantidad: 2')).toBeInTheDocument();
  });
});
