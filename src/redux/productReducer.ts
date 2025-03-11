import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
type ProductType = {
  id?: string;
  name: string;
  brand?: string;
  category: string;
  subCategory: string;
  photo: string;
  price: string;
  discountedPrice?: string;
  discountedPercent?: () => number;
  rating?: string;
  star?: string[];
  reviews?: string;
  quantity?: string;
  likes?: string[];
  views?: string[];
  newArrival?: boolean;
  flashSales?: boolean;
  explore?: boolean;
  bestSelling?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const initialState: ProductType = {
  id: "",
  name: "",
  brand: "",
  category: "",
  subCategory: "",
  photo: "",
  price: "",
  discountedPrice: "",
  discountedPercent: function () {
    if (this.price && this.discountedPrice) {
      return (
        (parseFloat(this.discountedPrice) / parseFloat(this.price) - 1) * 100
      );
    } else {
      return 0;
    }
  },
  rating: "",
  star: [],
  reviews: "",
  quantity: "",
  likes: [],
  views: [],
  newArrival: false,
  flashSales: false,
  explore: false,
  bestSelling: false,
  createdAt: "",
  updatedAt: "",
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // getProducts(state, action: PayloadAction<any>) {
    // },
    // addProduct(state, action: PayloadAction<any>) {
    // },
    // deleteProduct(state, action: PayloadAction<any>) {
    // },
    // updateProduct(state, action: PayloadAction<any>) {
    // },
  },
});

// export const { getProducts, addProduct, deleteProduct, updateProduct } =
//   productSlice.actions;
export default productSlice.reducer;
