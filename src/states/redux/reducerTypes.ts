export type ProductType = {
  id?: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  subCategory: string;
  photo: Array<string>;
  price: string;
  discountedPrice: string;
  rating: Array<string>;
  reviews: Array<string>;
  quantity: number;
  likes: Array<string>;
  views: Array<string>;
  color: string
  allColors: Array<string>
  size: Array<string>
  isNewArrival: boolean;
  isFlashSales: boolean;
  isExplore: boolean;
  isBestSelling: boolean;
  timeStamp?: string;
};

