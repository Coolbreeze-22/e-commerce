import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OrderProps } from "./reducerTypes";
import { toastNotification } from "../../components/utils/toastNotification";

export type OrderInitialStateProps = {
  orders: Array<OrderProps>;
  total: number;
  isLoading: boolean;
};
export const orderInitialState: OrderInitialStateProps = {
  orders: [],
  total: 0,
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {
    createOrder(state, action: PayloadAction<OrderProps>) {
      state.orders.push(action.payload);
      state.total += action.payload.total;
      toastNotification("Order created successfully", "success");
    },

    deleteOrder(state, action: PayloadAction<string>) {
      const existingOrder = state.orders.find(
        (order) => order.transactionId === action.payload
      );
      if (existingOrder) {
        state.orders = state.orders.filter(
          (order) => order.transactionId !== action.payload
        );
        state.total -= existingOrder.total;
        toastNotification("Order deleted successfully", "success");
      }
    },
    updateOrder(state, action: PayloadAction<{ id: string; orderStatus: string }>) {
      const existingOrderIndex = state.orders.findIndex(
        (order) => order.transactionId === action.payload.id
      );
      if (existingOrderIndex) {
        state.orders[existingOrderIndex].orderStatus = action.payload.orderStatus
        toastNotification("Order-status updated successfully", "success");
      }
    },
    clearOrdersByAdmin(state) {
      state.orders = [];
      (state.total = 0),
        (state.isLoading = false),
        toastNotification("Order cleared successfully", "success");
    },
    orderLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { createOrder, deleteOrder, updateOrder, clearOrdersByAdmin, orderLoading } = orderSlice.actions;
export default orderSlice.reducer;
