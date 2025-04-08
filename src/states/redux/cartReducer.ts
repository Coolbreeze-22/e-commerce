import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartProductType, ProductType } from "./reducerTypes";
import { toastNotification } from "../../components/utils/toastNotification";

export type CartInitialStateType = {
  products: Array<CartProductType>;
  total: number;
  watchlist: Array<ProductType>;
};
export const cartInitialState: CartInitialStateType = {
  products: [],
  total: 0,
  watchlist: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProductType>) {
      const existingProduct = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );
      const isItemInStock =
        existingProduct &&
        existingProduct.quantity + action.payload.quantity <=
          existingProduct.inStock;
      const isItemNotInStock =
        existingProduct &&
        existingProduct.quantity + action.payload.quantity >
          existingProduct.inStock;
      const soldPrice = action.payload.discountedPrice
        ? action.payload.discountedPrice
        : action.payload.price;

      if (isItemInStock) {
        existingProduct.quantity += action.payload.quantity;
        state.total += Number(soldPrice * action.payload.quantity);

        toastNotification("Quantity increased successfully !", "success");
      } else if (isItemNotInStock) {
        toastNotification("Available quantity exceeded !", "warning");
      } else {
        state.products.push(action.payload);
        state.total += Number(soldPrice * action.payload.quantity);
        toastNotification("Added successfully !", "success");
      }
    },

    removeFromCart(state, action: PayloadAction<{ id: string; size: string }>) {
      const removeProduct = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );

      if (removeProduct) {
        const soldPrice = removeProduct.discountedPrice
          ? removeProduct.discountedPrice
          : removeProduct.price;

        state.products = state.products.filter(
          (product) =>
            product.id !== action.payload.id ||
            product.size !== action.payload.size
        );
        state.total -= Number(soldPrice * removeProduct.quantity);
        toastNotification("Removed from cart successfully !", "success");
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: string; size: string; quantity: number }>
    ) {
      const product = action.payload;
      const existingProduct = state.products.find(
        (p) => p.id === product.id && p.size === product.size
      );
      if (existingProduct) {
        const soldPrice = existingProduct.discountedPrice
          ? existingProduct.discountedPrice
          : existingProduct.price;

        state.total += Number(
          soldPrice * (product.quantity - existingProduct.quantity)
        );

        existingProduct.quantity = product.quantity;

        toastNotification("Updated successfully !", "success");
      }
    },

    watchlist(state, action: PayloadAction<ProductType>) {
      const existingProduct = state.watchlist.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct) {
        state.watchlist = state.watchlist.filter(
          (product) => product.id !== action.payload.id
        );
        toastNotification("Removed from watchlist successfully !", "success");
        return;
      }
      state.watchlist.push(action.payload);
      toastNotification("Added to watchlist successfully !", "success");
    },
    clearCart(state) {
      (state.products = []), (state.total = 0), (state.watchlist = []);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  watchlist,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
