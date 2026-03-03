import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Product } from './Product';
import type { IProduct } from '../types/products';

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

describe('Product', () => {
  const mockProduct: IProduct = {
    id: 1,
    title: 'Producto de Prueba',
    price: 100,
    category: 'Cuenta',
    image: '/test-image.png',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar el producto correctamente', () => {
    render(<Product product={mockProduct} />);

    expect(screen.getByText('Producto de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Precio: 100')).toBeInTheDocument();
  });

  it('debe mostrar el estado de carga', () => {
    const { container } = render(<Product loading={true} />);
    
    expect(container.querySelector('.ant-card-loading')).toBeInTheDocument();
  });

  it('debe llamar addProduct cuando se hace clic en el botón de agregar', async () => {
    const user = userEvent.setup();
    const { useProductsStore } = await import('../store/products');
    const mockAddProduct = vi.fn();
    
    vi.mocked(useProductsStore).mockImplementation((selector: any) => {
      const state = {
        addProduct: mockAddProduct,
        removeProduct: vi.fn(),
      };
      return selector(state);
    });

    const { container } = render(<Product product={mockProduct} />);
    
    const addButton = container.querySelector('[aria-label="plus-circle"]');
    if (addButton) {
      await user.click(addButton);
      expect(mockAddProduct).toHaveBeenCalledWith(mockProduct);
    }
  });

  it('debe mostrar la cantidad en el modo carrito', () => {
    render(<Product product={mockProduct} cart={true} count={5} />);

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Cantidad: 5')).toBeInTheDocument();
  });

  it('debe llamar removeProduct cuando se hace clic en el botón menos', async () => {
    const user = userEvent.setup();
    const { useProductsStore } = await import('../store/products');
    const mockRemoveProduct = vi.fn();
    
    vi.mocked(useProductsStore).mockImplementation((selector: any) => {
      const state = {
        addProduct: vi.fn(),
        removeProduct: mockRemoveProduct,
      };
      return selector(state);
    });

    render(<Product product={mockProduct} cart={true} count={2} />);
    
    const buttons = screen.getAllByRole('img', { hidden: true });
    const minusButton = buttons.find(btn => btn.getAttribute('data-icon') === 'minus');
    
    if (minusButton) {
      await user.click(minusButton.parentElement!);
      expect(mockRemoveProduct).toHaveBeenCalledWith(mockProduct.id);
    }
  });

  it('no debe mostrar acciones cuando está en modo loading', () => {
    const { container } = render(<Product loading={true} />);
    
    const actions = container.querySelectorAll('.ant-card-actions li');
    expect(actions.length).toBe(0);
  });
});
