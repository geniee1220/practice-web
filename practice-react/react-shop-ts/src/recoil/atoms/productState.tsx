import { atom } from 'recoil';
import { ProductListParams } from '../../apis/products/model';

export const productListState = atom<ProductListParams[] | undefined>({
  key: 'productListState',
  default: [],
});
