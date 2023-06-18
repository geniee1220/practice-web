import React from 'react';
import { ProductListParams } from '../../../apis/products/model';
import { useLocation } from 'react-router-dom';

interface DetailProps {
  productData: ProductListParams | null | undefined;
}

export default function Detail({ productData }: DetailProps) {
  return (
    <>
      {productData && (
        <div className="lg:flex lg:items-center mt-6 md:mt-14 px-2 lg:px-0">
          <figure className="flex-shrink-0 rounded-2xl overflow-hidden px-4 py-4 bg-white view_image">
            <img
              src={productData?.image}
              alt={productData?.description}
              className="object-contain w-full h-72 min-w-[300px]"
            />
          </figure>
          <div className="card-body px-1 lg:px-12">
            <h2 className="card-title">
              {productData?.title}
              <span className="badge badge-accent ml-2">NEW</span>
            </h2>
            <p>{productData?.description}</p>
            <div className="flex items-center mt-3">
              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
              </div>
              <div className="ml-2">
                {productData?.rating.rate} / {productData?.rating.count} 참여
              </div>
            </div>
            <p className="mt-2 mb-4 text-3xl">{'$' + productData?.price}</p>
            <div className="card-actions">
              <button className="btn btn-primary">장바구니에 담기</button>
              <a className="btn btn-outline ml-1" href="/cart">
                장바구니로 이동
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
