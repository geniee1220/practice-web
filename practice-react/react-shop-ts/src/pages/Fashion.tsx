import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "../apis/products";
import { ProductListParams } from "../apis/products/model";
import ProductSection from "../components/Product/ProductSection";

interface FashionProps {
  pageType?: string;
}

export default function Fashion({ pageType }: FashionProps) {
  const [products, setProducts] = useState<ProductListParams[] | null>();
  const categoryName = "패션";

  useEffect(() => {
    if (products) return;

    async function fetchData() {
      const response = await getProducts();

      const filteredProducts = response?.filter(
        (product) =>
          product.category === "men's clothing" ||
          product.category === "women's clothing"
      );
      setProducts(filteredProducts);
    }
    fetchData();
  }, []);

  return (
    <Layout pageType={pageType}>
      <ProductSection
        categoryName={categoryName}
        products={products}
        pageType={pageType}
      />
    </Layout>
  );
}
