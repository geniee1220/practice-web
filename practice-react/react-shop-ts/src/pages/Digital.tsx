import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "../apis/products";
import { ProductListParams } from "../apis/products/model";
import ProductSection from "../components/Product/ProductSection";

interface DigitalProps {
  pageType?: string;
}

export default function Digital({ pageType }: DigitalProps) {
  const [products, setProducts] = useState<ProductListParams[] | null>();
  const categoryName = "디지털";
  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();

      const filteredProducts = response?.filter(
        (product) => product.category === "electronics"
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
