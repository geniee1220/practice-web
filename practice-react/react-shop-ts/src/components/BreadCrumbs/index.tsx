import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { ProductListParams } from '../../apis/products/model';
import { productListState } from '../../recoil/atoms/productState';
import { getProductById } from '../../apis/products';

interface BreadcrumbsProps {
  paths: string[];
  categoryNameList: { label: string; value: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  paths,
  categoryNameList,
}) => {
  const [productData, setProductData] = useState<ProductListParams | null>();
  const productId = paths[paths.length - 1];

  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(productId);
      console.log(product);
      setProductData(product);
    };
    getProduct();
  }, []);

  return (
    <div className="text-sm breadcrumbs">
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        {paths.map((path, index) => {
          const url = `/${paths.slice(0, index + 1).join('/')}`;
          const categoryName = categoryNameList.find(
            (category) => category.value === path
          );
          const label = categoryName ? categoryName.label : productData?.title;
          return (
            <li key={url}>
              <Link to={`${url}`}>{label}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
