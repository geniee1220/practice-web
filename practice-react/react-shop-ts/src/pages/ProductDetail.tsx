import React, { useEffect, useState, lazy, Suspense } from "react";
import { getProductById } from "../apis/products";
import { useLocation, useParams } from "react-router-dom";
import { ProductListParams } from "../apis/products/model";
import Detail from "../components/Product/Detail";
import Breadcrumbs from "../components/BreadCrumbs";

export default function ProductDetail() {
  const location = useLocation();
  const productId = location.pathname.split("/").pop();
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
      {productData && (
        <section className="pt-16">
          <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
            {/* <Breadcrumbs></Breadcrumbs> */}
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
                    {productData?.rating.rate} / {productData?.rating.count}{" "}
                    참여
                  </div>
                </div>
                <p className="mt-2 mb-4 text-3xl">{"$" + productData?.price}</p>
                <div className="card-actions">
                  <button className="btn btn-primary">장바구니에 담기</button>
                  <a className="btn btn-outline ml-1" href="/cart">
                    장바구니로 이동
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
