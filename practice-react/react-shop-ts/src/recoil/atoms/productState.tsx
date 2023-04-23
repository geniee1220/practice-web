import { atom } from "recoil";

interface ProductList {}

export const productListState = atom<ProductList[]>({
  key: "productListState",
  default: [],
});
