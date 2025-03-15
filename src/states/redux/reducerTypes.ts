export type ProductType = {
  id?: string;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  photo: string;
  price: string;
  discountedPrice: string;
  rating: number | undefined;
  reviews: Array<string>;
  quantity: string;
  likes: Array<string>;
  views: Array<string>;
  color: Array<string>
  size: Array<string>
  isNewArrival: boolean;
  isFlashSales: boolean;
  isExplore: boolean;
  isBestSelling: boolean;
  timeStamp?: string;
};

