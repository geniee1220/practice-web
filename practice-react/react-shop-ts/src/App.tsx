import './index.css';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Routes, Route } from 'react-router-dom';
import { themeState } from './recoil/atoms/globalState';
import { getProducts } from './apis/products';
import { ProductListParams } from './apis/products/model';
import { productListState } from './recoil/atoms/productState';

import Nav from './components/Nav';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import NotFound from './pages/NotFound';
import Category from './pages/Category';
import Cart from './pages/Cart';

function App() {
  const [_products, setProducts] = useRecoilState<
    ProductListParams[] | undefined
  >(productListState);

  // 테마
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme(localStorage.getItem('theme') as string);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // 데이터 fetch
  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();

      if (response) setProducts(response);
    }
    fetchData();
  }, []);

  return (
    <div className={theme == 'dark' ? 'dark' : 'light'}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:category" element={<Category />} />
        <Route path="/:category/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
