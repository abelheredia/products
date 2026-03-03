import { useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from './Product';
import { Button, Drawer, FloatButton, Typography } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { TextField } from './Form/TextField';
import { SelectField } from './Form/SelectField';
const { Title } = Typography;

export const Products = () => {
  const {
    products,
    loading,
    fetchProducts,
    filterProductForm,
    openFilter,
    handleOpenFilter,
    handleCloseFilter,
    filterProducts,
    resetFilters
  } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-5">
      <Title level={3}>Productos</Title>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 items-center">
        {!loading &&
          products.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        {loading &&
          Array.from({ length: 5 }).map((_, index) => (
            <Product key={index} loading={loading} />
          ))}
      </div>
      <FloatButton
        icon={<FilterOutlined />}
        onClick={handleOpenFilter}
        style={{ insetInlineStart: 24 }}
        tooltip="Filtrar productos"
      />
      <Drawer
        title="Filtrar Productos"
        closable={true}
        onClose={handleCloseFilter}
        open={openFilter}
        placement="left"
      >
        <div className="flex flex-col gap-5">
          <TextField
            hookForm={filterProductForm}
            name="description"
            label="Descripción"
            className="w-full sm:w-auto"
          />
          <SelectField
            className="w-full sm:w-auto"
            hookForm={filterProductForm}
            name="category"
            label="Categoría"
            options={[
              { label: 'Cuentas', value: 'cuenta' },
              { label: 'Créditos', value: 'crédito' },
              { label: 'Tarjetas', value: 'tarjeta' }
            ]}
          />
          <div className="flex justify-end gap-2">
            <Button onClick={resetFilters}>Borrar</Button>
            <Button type="primary" onClick={filterProducts}>
              Filtrar
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
