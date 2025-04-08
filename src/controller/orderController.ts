import * as reducer from "../states/redux/orderReducer";
import { AppDispatch } from "../states/redux/store";
import { OrderProps } from "../states/redux/reducerTypes";
import { clearCart } from "../states/redux/cartReducer";
import { NavigateFunction } from "react-router-dom";
import { toastNotification } from "../components/utils/toastNotification";

interface CreateOrderProps {
  order: OrderProps;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}
export const createOrder = async (data: CreateOrderProps) => {
  const { order, dispatch, navigate } = data;
  console.log("controller", order);
  try {
    dispatch(reducer.orderLoading(true));
    // const data = addDoc(order)
    // dispatch(reducer.createOrder(data));
    dispatch(reducer.createOrder(order));
    dispatch(clearCart());
    dispatch(reducer.orderLoading(false));
    navigate("/account");
  } catch (error: any) {
      toastNotification(error.message, "error");
  }
};

export const deleteOrder = async (id: string, dispatch: AppDispatch) => {
  try {
    //await deleteDoc(order)
    dispatch(reducer.deleteOrder(id));
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

