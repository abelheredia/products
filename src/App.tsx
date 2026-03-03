import { Products } from './components/Products';
import { Cart } from './components/Cart';
import { Suspense } from 'react';
import { Spin } from 'antd';

function App() {
  return (
    <Suspense fallback={<Spin size="large" />}>
      <Products />
      <Cart />
    </Suspense>
  );
}

export default App;
