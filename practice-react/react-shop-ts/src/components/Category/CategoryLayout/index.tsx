import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../../../apis/products";
import { ProductListParams } from "../../../apis/products/model";
import Layout from "../../../pages/Layout";
import ProductSection from "../../Product/ProductSection";

export default function CategoryLayout() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<ProductListParams[] | null>();

  useEffect(() => {
    async function fetchData() {
      const response = await getProducts();
      let filteredProducts;

      if (category === "digital") {
        filteredProducts = response?.filter(
          (product) => product.category === "electronics"
        );
      } else if (category === "accessory") {
        filteredProducts = response?.filter(
          (product) => product.category === "jewelery"
        );
      } else if (category === "fashion") {
        filteredProducts = response?.filter(
          (product) =>
            product.category === "men's clothing" ||
            product.category === "women's clothing"
        );
      }

      setProducts(filteredProducts);
    }
    fetchData();
  }, [category]);

  useEffect(() => {
    console.log("products", products);
  }, [products]);

  return (
    <Layout>
      <ProductSection
        categoryName={category}
        products={products}
      ></ProductSection>
    </Layout>
  );
}
