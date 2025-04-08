import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "./reducerTypes";

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
  // [key: string]: Array<ProductType> | Array<string> |boolean | string 
  [key: string]: any;
};

export const initialState: InitialStateProps = {
  products: [],
  flashSales: [],
  bestSelling: [],
  explore: [],
  newArrival: [],
  uniqueFlashSales: [],
  uniqueBestSelling: [],
  uniqueExplore: [],
  uniqueNewArrival: [],
  category: [],
  subCategory: [],
  isLoading: false,
  error: "",
};


const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts(state, action: PayloadAction<Array<ProductType>>) {
      state.products = action.payload;
    },
    getFlashSales(state, action: PayloadAction<Array<ProductType>>) {
      state.flashSales = action.payload;
    },
    getBestSelling(state, action: PayloadAction<Array<ProductType>>) {
      state.bestSelling = action.payload;
    },
    getExplore(state, action: PayloadAction<Array<ProductType>>) {
      state.explore = action.payload;
    },
    getNewArrival(state, action: PayloadAction<Array<ProductType>>) {
      state.newArrival = action.payload;
    },
    getUniqueFlashSales(state, action: PayloadAction<Array<ProductType>>) {
      state.uniqueFlashSales = action.payload;
    },
    getUniqueBestSelling(state, action: PayloadAction<Array<ProductType>>) {
      state.uniqueBestSelling = action.payload;
    },
    getUniqueExplore(state, action: PayloadAction<Array<ProductType>>) {
      state.uniqueExplore = action.payload;
    },
    getUniqueNewArrival(state, action: PayloadAction<Array<ProductType>>) {
      state.uniqueNewArrival = action.payload;
    },
    getCategory(state, action: PayloadAction<Array<string>>) {
      state.category = action.payload;
    },
    getSubCategory(state, action: PayloadAction<Array<string>>) {
      state.subCategory = action.payload;
    },
    // addProduct(state, action: PayloadAction<ProductType>) {
    // },
    // deleteProduct(state, action: PayloadAction<any>) {
    // },
    // updateProduct(state, action: PayloadAction<any>) {
    // },
    productLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    productError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  getProducts,
  getFlashSales,
  getBestSelling,
  getExplore,
  getNewArrival,
  getUniqueFlashSales,
  getUniqueBestSelling,
  getUniqueExplore,
  getUniqueNewArrival,
  getCategory,
  getSubCategory,
  productLoading,
  productError,
} = productSlice.actions;
export default productSlice.reducer;
