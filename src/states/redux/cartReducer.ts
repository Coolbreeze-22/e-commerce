import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CartProductType, ProductType } from "./reducerTypes";
import { toastNotification } from "../../components/utils/toastNotification";

export type CartInitialStateType = {
  products: Array<CartProductType>;
  total: number;
  wishlist: Array<ProductType>;
};
export const cartInitialState: CartInitialStateType = {
  products: [],
  total: 0,
  wishlist: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProductType>) {
      const { payload } = action;
      const existingProduct = state.products.find(
        (product) => product.id === payload.id && product.size === payload.size
      );
      const soldPrice = payload.discountedPrice
        ? payload.discountedPrice
        : payload.price;

      if (existingProduct?.id) {
        toastNotification("Item already in cart !", "warning");
      } else {
        if (payload.quantity > payload.inStock) {
          toastNotification("Available quantity exceeded !", "warning");
          return;
        }
        state.products.push(payload);
        state.total += Number(soldPrice * payload.quantity);
        toastNotification("Added to cart successfully !", "success");
      }
    },

    removeFromCart(state, action: PayloadAction<{ id: string; size: string }>) {
      const existingProduct = state.products.find(
        (product) =>
          product.id === action.payload.id &&
          product.size === action.payload.size
      );

      if (existingProduct?.id) {
        const soldPrice = existingProduct.discountedPrice
          ? existingProduct.discountedPrice
          : existingProduct.price;

        state.products = state.products.filter(
          (product) =>
            product.id !== action.payload.id ||
            product.size !== action.payload.size
        );
        state.total -= Number(soldPrice * existingProduct.quantity);
        toastNotification("Removed from cart successfully !", "success");
      }
    },

    updateQuantity(
      state,
      action: PayloadAction<{ id: string; size: string; quantity: number }>
    ) {
      const payload = action.payload;

      const existingProduct = state.products.find(
        (product) => product.id === payload.id && product.size === payload.size
      );
      const isItemInStock =
        existingProduct && existingProduct.inStock >= payload.quantity;
      if (isItemInStock && payload.quantity > 0) {
        const soldPrice = existingProduct.discountedPrice
          ? existingProduct.discountedPrice
          : existingProduct.price;

        state.total += Number(
          soldPrice * (payload.quantity - existingProduct.quantity)
        );
        existingProduct.quantity = payload.quantity;
        toastNotification("Updated successfully !", "success");
      } else if (isItemInStock && payload.quantity < 1) {
        toastNotification(
          `Select betweeen 1 to ${existingProduct.inStock}`,
          "warning"
        );
      } else if (!payload.id) {
        toastNotification("No changes made", "warning");
        // this Notification will never occur, since this scenario is blocked in cartInitialState.tsx
      } else {
        toastNotification("Available quantity exceeded !", "warning");
      }
    },

    addToWishlist(state, action: PayloadAction<ProductType>) {
      const existingProduct = state.wishlist.find(
        (product) => product.id === action.payload.id
      );
      if (existingProduct?.id) {
        toastNotification("Item already in wishlist !", "warning");
        return;
      }
      state.wishlist.push(action.payload);
      toastNotification("Added to wishlist successfully !", "success");
    },
    removeFromWishlist(
      state,
      action: PayloadAction<{ id: string; label: string }>
    ) {
      const { id, label } = action.payload;
      const existingProduct = state.wishlist.find(
        (product) => product.id === id
      );
      if (existingProduct?.id) {
        state.wishlist = state.wishlist.filter((product) => product.id !== id);
        if (label === "no notification") return;
        toastNotification("Removed from wishlist successfully !", "success");
      } else {
        toastNotification("Product not found in wishlist !", "error");
      }
    },

    clearCart(state) {
      (state.products = []), (state.total = 0);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  addToWishlist,
  removeFromWishlist,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
