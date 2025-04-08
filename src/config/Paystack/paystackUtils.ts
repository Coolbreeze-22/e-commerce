import { createOrder } from "../../controller/orderController";
import { CartProductType, OrderProps } from "../../states/redux/reducerTypes";
import type { Dispatch } from "redux";
import { NavigateFunction } from "react-router-dom";

interface HandleOrderProps {
  transactionId: string;
  refId: string;
  userId: string;
  items: Array<CartProductType>;
  paymentStatus: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  dispatch: Dispatch;
  navigate: NavigateFunction
}

export const handleOrder = (data: HandleOrderProps) => {
  const {
    transactionId,
    refId,
    userId,
    items,
    paymentStatus,
    subtotal,
    deliveryFee,
    total,
    dispatch,
    navigate
  } = data;

  const order: OrderProps = {
    id: "",
    transactionId,
    refId,
    userId,
    orderStatus: "processing",
    paymentStatus,
    items,
    createdAt: new Date().getTime().toString(),
    updatedAt: new Date().getTime().toString(),
    subtotal,
    deliveryFee,
    total,
  };
  createOrder({order, dispatch, navigate});
};
