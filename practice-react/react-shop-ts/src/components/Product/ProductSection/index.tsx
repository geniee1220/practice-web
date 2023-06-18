import { ProductListParams } from '../../../apis/products/model';
import { Link, useLocation } from 'react-router-dom';

import Card from '../Card';

interface ProductSectionProps {
  categoryName: string;
  products: ProductListParams[] | null | undefined;
  pageType?: string;
}

export default function ProductSection({
  categoryName,
  products,
  pageType,
}: ProductSectionProps) {
  const productsToShow = pageType === '홈' ? products?.slice(0, 4) : products;

  const convertedName =
    categoryName?.charAt(0).toUpperCase() + categoryName?.slice(1);

  return (
    <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
        {convertedName}
      </h2>

      {productsToShow ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productsToShow?.map((product) => (
            <Link
              to={`/${categoryName}/${product.id}`}
              className="flex flex-col border rounded-md overflow-hidden border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
              key={product.id}
            >
              <Card key={product.id} product={product}></Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center">Loading...</div>
      )}
    </article>
  );
}
