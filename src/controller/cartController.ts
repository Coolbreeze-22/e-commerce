import * as reducer from "../states/redux/cartReducer";
import { AppDispatch } from "../states/redux/store";
import { CartProductType, ProductType } from "../states/redux/reducerTypes";
import { toastNotification } from "../components/utils/toastNotification";

type AddToCartProps = {
  cartProduct: CartProductType;
  dispatch: AppDispatch;
};
type WatchlistProps = {
  product: ProductType;
  dispatch: AppDispatch;
};
type UpdateQuantityProps = {
  id: string;
  size: string;
  quantity: number;
};
type RemoveFromCartProps = Omit<UpdateQuantityProps, "quantity">;

export const addToCart = async (item: AddToCartProps) => {
  const { cartProduct, dispatch } = item;
  try {
    dispatch(reducer.addToCart(cartProduct));
  } catch (error: any) {
    toastNotification("Failed to add item to cart !", "error");
  }
};

export const updateQuantity = async (
  item: UpdateQuantityProps,
  dispatch: AppDispatch
) => {
  try {
    dispatch(reducer.updateQuantity(item));
  } catch (error: any) {
    toastNotification("Failed to update cart !", "error");
  }
};

export const removeFromCart = async (
  item: RemoveFromCartProps,
  dispatch: AppDispatch
) => {
  try {
    dispatch(reducer.removeFromCart(item));
  } catch (error: any) {
    toastNotification("Failed to remove item from cart !", "error");
  }
};

export const watchlist = async (item: WatchlistProps) => {
  const { product, dispatch } = item;
  try {
    dispatch(reducer.watchlist(product));
  } catch (error: any) {
    toastNotification("Watchlist action failed !", "error");
  }
};

export const clearCart = async (dispatch: AppDispatch) => {
  try {
    dispatch(reducer.clearCart());
  } catch (error: any) {
    toastNotification("Failed to clear cart !", "error");
  }
};
