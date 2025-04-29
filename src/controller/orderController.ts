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
interface UpdateOrderProps {
  id: string;
  orderStatus: string;
  dispatch: AppDispatch;
}
export const createOrder = async (data: CreateOrderProps) => {
  const { order, dispatch, navigate } = data;
  try {
    dispatch(reducer.orderLoading(true));
    // const data = addDoc(order)
    // dispatch(reducer.createOrder(data));
    dispatch(reducer.createOrder(order));
    dispatch(clearCart());
    dispatch(reducer.orderLoading(false));
    navigate("/account", { state: { to: "orders" }, replace: true });
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

export const deleteOrder = async (id: string, dispatch: AppDispatch) => {
  try {
<<<<<<< HEAD
    console.log("testing",id, dispatch)
=======
    console.log("testing", id, dispatch)
>>>>>>> main
    //await deleteDoc(order)
    // dispatch(reducer.deleteOrder(id));
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};
export const updateOrder = async (data: UpdateOrderProps) => {
  const { id, orderStatus, dispatch } = data;
  try {
    //await updateDoc(order)
    dispatch(reducer.updateOrder({ id, orderStatus }));
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};
