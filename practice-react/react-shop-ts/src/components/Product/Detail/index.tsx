import React from 'react';
import { ProductListParams } from '../../../apis/products/model';
import { useLocation } from 'react-router-dom';

interface DetailProps {
  productData: ProductListParams | null | undefined;
}

export default function Detail({ productData }: DetailProps) {
  if (!productData) return null;

  const MAX_RATE = 10; // 최대 별점
  const rate = productData?.rating.rate; // 상품의 별점
  const countedRate = Math.floor(rate / 0.5); // 채워야하는 별 계산

  // 장바구니에 담기
  const onClickAddCart = () => {
    // 로컬 스토리지에 장바구니 데이터 확인
    const cart = localStorage.getItem('cart');
    // 로컬 스토리지에 장바구니 데이터가 있으면 가져오고 없으면 빈 배열로 초기화
    const cartList = cart ? JSON.parse(cart) : [];
    // 로컬 스토리지에 장바구니 데이터가 있으면 해당 상품이 있는지 확인
    const existItem = cartList.find(
      (item: { id: string }) =>
        item.id === (productData?.id as unknown as string)
    );
    // 장바구니에 해당 상품이 있으면 수량을 1 증가
    if (existItem) {
      existItem.quantity += 1;
    } else {
      // 장바구니에 해당 상품이 없으면 수량을 1로 초기화
      cartList.push({ ...productData, quantity: 1 });
    }
    // 로컬 스토리지에 장바구니 데이터 저장
    localStorage.setItem('cart', JSON.stringify(cartList));
  };

  return (
    <>
      {productData ? (
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
              <div className="rating rating-half">
                {[...Array(MAX_RATE)].map((_, index) => {
                  return (
                    <input
                      key={index}
                      type="radio"
                      name="rating-10"
                      className={`bg-yellow-400 cursor-default mask mask-star-2 mask-half-${
                        index % 2 === 0 ? 1 : 2
                      }`}
                      disabled
                      checked={index < countedRate}
                    />
                  );
                })}
              </div>
              <div className="ml-2">
                {productData?.rating.rate} / {productData?.rating.count} 참여
              </div>
            </div>
            <p className="mt-2 mb-4 text-3xl">{'$' + productData?.price}</p>
            <div className="card-actions">
              <button className="btn btn-primary" onClick={onClickAddCart}>
                장바구니에 담기
              </button>
              <a className="btn btn-outline ml-1" href="/cart">
                장바구니로 이동
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div>로딩 중입니다.</div>
      )}
    </>
  );
}
