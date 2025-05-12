import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { InitialStateProps, ProductType } from "./reducerTypes";

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
    createProduct(state, action: PayloadAction<ProductType>) {
      state.products.push(action.payload);
    },
    updateProductByAdmin(state, action: PayloadAction<ProductType>) {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (existingProductIndex >= 0) {
        state.products[existingProductIndex] = {
          ...state.products[existingProductIndex],
          ...action.payload,
        };
      }
    },
    deleteProductByAdmin(state, action: PayloadAction<string>) {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload
      );
      if (existingProduct?.id) {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      }
    },
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
  createProduct,
  updateProductByAdmin,
  deleteProductByAdmin,
} = productSlice.actions;
export default productSlice.reducer;
