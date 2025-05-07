export type CountdownType = {
  name: string;
  startDate: string;
  endDate: string;
  id: string;
};

export type InitialStateProps = {
  products: Array<ProductType>;
  flashSales: Array<ProductType>;
  bestSelling: Array<ProductType>;
  explore: Array<ProductType>;
  newArrival: Array<ProductType>;
  uniqueFlashSales: Array<ProductType>;
  uniqueBestSelling: Array<ProductType>;
  uniqueExplore: Array<ProductType>;
  uniqueNewArrival: Array<ProductType>;
  category: Array<string>;
  subCategory: Array<string>;
  isLoading: boolean;
  error: string;
  [key: string]: Array<ProductType> | Array<string> | boolean | string;
  // [key: string]: any;
};

export type ProductType = {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  subCategory: string;
  photo: Array<string>;
  price: number;
  discountedPrice: number | null;
  rating: Array<string>;
  reviews: Array<string>;
  inStock: number;
  likes: Array<string>;
  views: Array<string>;
  color: string;
  allColors: Array<string>;
  size: string;
  allSizes: Array<string>;
  isNewArrival: boolean;
  isFlashSales: boolean;
  isExplore: boolean;
  isBestSelling: boolean;
  otherSizeInfo: {
    XS: { inStock: number; price: number; discountedPrice: number };
    S: { inStock: number; price: number; discountedPrice: number };
    M: { inStock: number; price: number; discountedPrice: number };
    L: { inStock: number; price: number; discountedPrice: number };
    XL: { inStock: number; price: number; discountedPrice: number };
    [key: string]: Record<string, number>;
  };
  createdAt: string;
  upDatedAt: string;
  [key: string]:
    | string
    | number
    | boolean
    | Array<string>
    | null
    | { [key: string]: Record<string, number> };
};

export type CartProductType = {
  id: string;
  name: string;
  brand: string;
  description: string;
  category: string;
  subCategory: string;
  photo: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  inStock: number;
  color: string;
  size: string;
};

export interface UserProps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  photoUrl: string;
  address: string;
  companyName: string;
  apartment: string;
  city: string;
  isAdmin: boolean;
  isOwner: boolean;
  isSignedIn: boolean;
  lastLoginAt: string;
  lastLogoutAt: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderProps = {
  id: string;
  firstName: string;
  companyName: string;
  address: string;
  apartment: string;
  city: string;
  phoneNumber: string;
  email: string;
  transactionId: string;
  refId: string;
  userId: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMode: string;
  items: Array<CartProductType>;
  createdAt: string;
  updatedAt: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
};
