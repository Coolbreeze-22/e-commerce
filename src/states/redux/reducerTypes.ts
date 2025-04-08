export type ProductType = {
  id: string;
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
  color: string;
  allColors: Array<string>;
  size: Array<string>;
  isNewArrival: boolean;
  isFlashSales: boolean;
  isExplore: boolean;
  isBestSelling: boolean;
  otherSizeInfo: {
    XS: { quantity: number; price: number; discountedPrice: number };
    S: { quantity: number; price: number; discountedPrice: number };
    M: { quantity: number; price: number; discountedPrice: number };
    L: { quantity: number; price: number; discountedPrice: number };
    XL: { quantity: number; price: number; discountedPrice: number };
    [key: string]: any;
  };
  timeStamp: string;
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
  phoneNumber: string;
  address: string;
  companyName: string;
  apartment: string;
  city: string;
  isAdmin: boolean;
  isOwner: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderProps = {
  id: string;
  transactionId: string;
  refId: string;
  userId: string;
  orderStatus: string;
  paymentStatus: string;
  items: Array<CartProductType>;
  createdAt: string;
  updatedAt: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
};
