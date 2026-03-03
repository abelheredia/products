import { ShoppingCartOutlined } from '@ant-design/icons';
import { Drawer, Empty, FloatButton } from 'antd';
import { useProducts } from '../hooks/useProducts';
import { Product } from './Product';

export const Cart = () => {
  const {
    openCart,
    handleOpenCart,
    handleCloseCart,
    loadingCart,
    cartProducts
  } = useProducts();
  const cartCount = cartProducts.reduce((total, item) => total + item.count, 0);
  const totalPrice = cartProducts.reduce(
    (total, item) => total + item.product.price * item.count,
    0
  );

  return (
    <>
      <FloatButton
        icon={<ShoppingCartOutlined />}
        onClick={handleOpenCart}
        badge={{ count: cartCount, showZero: true }}
      />
      <Drawer
        title="Carrito de Productos"
        closable={true}
        onClose={handleCloseCart}
        open={openCart}
      >
        <div className="mb-4 flex items-center justify-between text-sm">
          <span>Total de items: {cartCount}</span>
          <span>Total: {totalPrice.toLocaleString()}</span>
        </div>
        <div className="flex flex-col gap-5">
          {!loadingCart &&
            cartProducts.map((item) => (
              <Product
                key={item.product.id}
                product={item.product}
                count={item.count}
                cart={true}
              />
            ))}
          {loadingCart &&
            Array.from({ length: 3 }).map((_, index) => (
              <Product key={index} loading={loadingCart} />
            ))}
          {!loadingCart && cartProducts.length === 0 && (
            <Empty description="No hay productos en el carrito" />
          )}
        </div>
      </Drawer>
    </>
  );
};
