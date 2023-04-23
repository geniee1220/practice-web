import React from "react";
import { ProductListParams } from "../../../apis/products/model";
import Card from "../Card";

import { Link } from "react-router-dom";

interface ProductSectionProps {
  categoryName: string | null;
  products: ProductListParams[] | null | undefined;
  pageType?: string;
}

export default function ProductSection({
  categoryName,
  products,
  pageType,
}: ProductSectionProps) {
  const productsToShow = pageType === "홈" ? products?.slice(0, 4) : products;

  return (
    <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
      <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
        {categoryName}
      </h2>

      {/* 데이터를 가져오기 전에는 로딩 보여줌  */}
      {productsToShow ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {productsToShow?.map((product) => (
            // <Card key={product.id} product={product}></Card>
            <Link
              to={`/product/${product.id}`}
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

      {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsToShow?.map((product) => (
          <Link
            to={`/product/${product.id}`}
            className="flex flex-col border rounded-md overflow-hidden border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
            key={product.id}
          >
            <Card key={product.id} product={product}></Card>
          </Link>
        ))}
      </div> */}
    </article>
  );
}
