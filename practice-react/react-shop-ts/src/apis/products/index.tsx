import axios from 'axios';
import { ProductListParams } from './model';

export async function getProducts() {
  try {
    const response = await axios.get<ProductListParams[]>(
      'https://fakestoreapi.com/products'
    );
    const products = response.data;
    return products;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getProductById(productId: string | undefined) {
  try {
    const response = await axios.get<ProductListParams>(
      `https://fakestoreapi.com/products/${productId}`
    );
    const product = response.data;
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}
