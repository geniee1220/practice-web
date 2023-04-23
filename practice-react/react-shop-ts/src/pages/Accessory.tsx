import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProducts } from "../apis/products";
import { ProductListParams } from "../apis/products/model";
import ProductSection from "../components/Product/ProductSection";

interface AccessoryProps {
  pageType?: string;
}

export default function Accessory({ pageType }: AccessoryProps) {
  const [products, setProducts] = useState<ProductListParams[] | null>();
  const categoryName = "액세서리";
  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();

      const filteredProducts = response?.filter(
        (product) => product.category === "jewelery"
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
