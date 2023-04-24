import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import { getProducts } from "../../../apis/products";
import { ProductListParams } from "../../../apis/products/model";
import Card from "../../Product/Card";
import Breadcrumbs from "../../BreadCrumbs";
import ProductDetail from "../../../pages/ProductDetail";
import NotFound from "../../../pages/NotFound";

interface CategoryLayoutProps {
  pageType?: string;
}

export default function CategoryLayout({ pageType }: CategoryLayoutProps) {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<
    ProductListParams[] | undefined | null
  >();

  console.log("category", category);

  const categoryNameList = [
    { label: "패션", value: "fashion" },
    {
      label: "액세서리",
      value: "accessory",
    },
    {
      label: "디지털",
      value: "digital",
    },
  ];

  const categoryLabel = categoryNameList.find(
    (item) => pageType !== "home" && item.value === category
  );

  function getFilteredProducts(
    response: ProductListParams[] | null | undefined,
    categoryName: string | undefined
  ) {
    let filteredProducts;
    if (categoryName === "digital") {
      filteredProducts = response?.filter(
        (product) => product.category === "electronics"
      );
    } else if (categoryName === "accessory") {
      filteredProducts = response?.filter(
        (product) => product.category === "jewelery"
      );
    } else if (categoryName === "fashion") {
      filteredProducts = response?.filter(
        (product) =>
          product.category === "men's clothing" ||
          product.category === "women's clothing"
      );
    }
    return filteredProducts;
  }

  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();
      let filteredProducts: any;

      if (pageType === "home") {
        const categoryNames = ["fashion", "accessory", "digital"];
        filteredProducts = categoryNames.map((categoryName) => {
          const categoryProducts = getFilteredProducts(response, categoryName);
          return categoryProducts?.slice(0, 4);
        });
        console.log("필터", filteredProducts);
      } else {
        filteredProducts = getFilteredProducts(response, category);
      }

      setProducts(filteredProducts.flat());
    }
    fetchData();
  }, [category]);

  useEffect(() => {
    console.log("products", products);
  }, [products]);

  return (
    <>
      <section className="pt-16">
        <div className="pt-4 lg:pt-5 pb-4 lg:pb-8 px-4 xl:px-2 xl:container mx-auto">
          {pageType !== "home" && <Breadcrumbs />}

          <article className="pt-2 lg:pt-4 pb-4 lg:pb-8 px-4 xl:px-2 mb-20 xl:container mx-auto">
            <h2 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
              {categoryLabel?.label}
            </h2>

            {pageType === "home" ? (
              <>
                {categoryNameList.map((category) => {
                  const categoryProducts = getFilteredProducts(
                    products,
                    category.value
                  );
                  const filteredCategoryProducts = categoryProducts?.slice(
                    0,
                    4
                  );

                  return (
                    <div key={category.value} className="mb-20">
                      <h3 className="mb-5 lg:mb-8 text-3xl lg:text-4xl text-center font-bold">
                        {category.label}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredCategoryProducts?.map((product) => (
                          <Link
                            to={`/product/${product.id}`}
                            className="flex flex-col border rounded-md overflow-hidden border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
                            key={product.id}
                          >
                            <Card key={product.id} product={product}></Card>
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products?.map((product, index) => (
                  <Link
                    to={`/product/${product.id}`}
                    className="flex flex-col border rounded-md overflow-hidden border-gray-200 dark:border-gray-800 card-compact lg:card-normal"
                    key={index}
                  >
                    <Card key={product.id} product={product}></Card>
                  </Link>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
}
