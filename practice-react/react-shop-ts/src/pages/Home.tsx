import { ProductListParams } from '../apis/products/model';
import { useRecoilState } from 'recoil';
import { productListState } from '../recoil/atoms/productState';

import CarouselSlide from '../components/Carousel';

import Category from './Category';

interface CarouselItem {
  title: string;
  describe: string;
  img: string;
  target: string;
}

export default function Home() {
  const categoryName = '홈';
  const category = ['fashion', 'accessory', 'digital'];

  const [products, _setProducts] = useRecoilState<
    ProductListParams[] | undefined
  >(productListState);

  // 캐러셀 옵션 및 아이템
  const carouselOptions = {
    interval: 3000,
    showThumbs: false,
    useKeyboardArrows: true,
    showStatus: false,
  };

  const carouselItem: CarouselItem[] = [
    {
      title: '물빠진 청바지!',
      describe: '이제 막 도착한 패션 청바지를 구경해 보세요.',
      img: 'https://github.com/geniee1220/practice/blob/main/practice-react/react-shop-ts/src/assets/carousel/img_shop_fashion.jpeg?raw=true',
      target: '/fashion',
    },
    {
      title: '신속한 업무처리!',
      describe: '다양한 디지털 상품을 둘러보세요.',
      img: 'https://github.com/geniee1220/practice/blob/main/practice-react/react-shop-ts/src/assets/carousel/img_shop_digital.jpeg?raw=true',
      target: '/digital',
    },
    {
      title: '신선한 식품!',
      describe: '농장 직배송으로 더욱 신선한 식료품을 구경해보세요.',
      img: 'https://github.com/geniee1220/practice/blob/main/practice-react/react-shop-ts/src/assets/carousel/img_shop_grocery.jpeg?raw=true',
      target: '/grocery',
    },
  ];

  return (
    <>
      <CarouselSlide
        carouselItem={carouselItem}
        carouselOptions={carouselOptions}
      />

      {category.map((category) => {
        return <Category pageType={categoryName} categoryName={category} />;
      })}
    </>
  );
}
