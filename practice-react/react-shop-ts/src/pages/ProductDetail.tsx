import { useEffect, useState } from 'react';
import { getProductById } from '../apis/products';
import { useLocation } from 'react-router-dom';
import { ProductListParams } from '../apis/products/model';
import Detail from '../components/Product/Detail';
import Layout from './Layout';

export default function ProductDetail() {
  const location = useLocation();
  const productId = location.pathname.split('/').pop();

  const [productData, setProductData] = useState<ProductListParams | null>();

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(productId);
      console.log(product);
      setProductData(product);
    };
    getProduct();
  }, [productId]);

  return (
    <>
      <Layout>
        <Detail productData={productData}></Detail>
      </Layout>
    </>
  );
}
