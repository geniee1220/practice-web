import { useEffect, useState } from 'react';
import { ProductListParams } from '../apis/products/model';
import { useRecoilState } from 'recoil';
import { productListState } from '../recoil/atoms/productState';

import Layout from './Layout';
import ProductSection from '../components/Product/ProductSection';
import { useLocation } from 'react-router-dom';

interface CategoryProps {
  pageType?: string;
  categoryName?: string;
}

export default function Category({ pageType, categoryName }: CategoryProps) {
  const location = useLocation();
  const path =
    pageType === '홈'
      ? (categoryName as string)
      : location.pathname.split('/')[1];

  const [products, _setProducts] = useRecoilState<
    ProductListParams[] | undefined
  >(productListState);

  const [filteredProducts, setFilteredProducts] = useState<
    ProductListParams[] | undefined
  >(undefined);

  useEffect(() => {
    const filterProductsByCategory = (category: string) => {
      switch (category) {
        case 'fashion':
          return products?.filter(
            (product) =>
              product.category === "men's clothing" ||
              product.category === "women's clothing"
          );
        case 'accessory':
          return products?.filter((product) => product.category === 'jewelery');
        case 'digital':
          return products?.filter(
            (product) => product.category === 'electronics'
          );
        default:
          return products;
      }
    };

    const filteredProducts = filterProductsByCategory(path);
    setFilteredProducts(filteredProducts);

    console.log(filteredProducts);
  }, [path, products]);

  return (
    <Layout pageType={pageType}>
      <ProductSection
        categoryName={path}
        products={filteredProducts}
        pageType={pageType}
      />
    </Layout>
  );
}
