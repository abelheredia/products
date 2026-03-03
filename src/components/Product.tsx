import { MinusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import type { IProduct } from '../types/products';
import { useProductsStore } from '../store/products';

type ProductProps = {
  loading?: boolean;
  product?: IProduct;
  cart?: boolean;
  count?: number;
};

export const Product = ({ loading, product, cart = false, count }: ProductProps) => {
  const addProduct = useProductsStore((state) => state.addProduct);
  const removeProduct = useProductsStore((state) => state.removeProduct);
  const { image, title, price, id } = product || {
    id: 0,
    image: '',
    title: '',
    price: 0
  };

  const actions = loading
    ? []
    : [
        <PlusCircleOutlined
          onClick={() => {
            if (product) {
              addProduct(product);
            }
          }}
        />
      ];

  const cartActions = loading
    ? []
    : [
        <MinusOutlined
          onClick={() => {
            if (id) {
              removeProduct(id);
            }
          }}
        />,
        <span className="px-2">{count ?? 0}</span>,
        <PlusCircleOutlined
          onClick={() => {
            if (product) {
              addProduct(product);
            }
          }}
        />
      ];

  return (
    <Card loading={loading} actions={cart ? cartActions : actions}>
      <Card.Meta
        avatar={<Avatar src={image} />}
        title={title}
        description={
          <>
            <p>Precio: {price}</p>
            {cart && <p>Cantidad: {count ?? 0}</p>}
          </>
        }
      />
    </Card>
  );
};
