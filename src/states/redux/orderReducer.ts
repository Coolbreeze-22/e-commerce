import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OrderProps } from "./reducerTypes";

export type OrderInitialStateProps = {
  userOrders: Array<OrderProps>;
  userTotal: number;
  allOrders: Array<OrderProps>;
  allOrdersTotal: number;
  isLoading: boolean;
};
export interface UpdateOrderByAdminProps {
  id: string;
  updateData: {
    orderStatus?: string;
    paymentStatus?: string;
    updatedAt: string;
  };
}
export const orderInitialState: OrderInitialStateProps = {
  userOrders: [],
  userTotal: 0,
  allOrders: [],
  allOrdersTotal: 0,
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {
    fetchOrders(state, action: PayloadAction<Array<OrderProps>>) {
      state.allOrders = action.payload;
      state.allOrdersTotal = action.payload.reduce(
        (totalAmount, order) => totalAmount + order.total,
        0
      );
    },
    getUserOrders(state, action: PayloadAction<Array<OrderProps>>) {
      state.userOrders = action.payload;
      state.userTotal = action.payload.reduce(
        (totalAmount, order) => totalAmount + order.total,
        0
      );
    },
    createOrder(state, action: PayloadAction<OrderProps>) {
      state.userOrders.push(action.payload);
      state.userTotal += action.payload.total;
    },

    updateOrderByAdmin(state, action: PayloadAction<UpdateOrderByAdminProps>) {
      const existingOrderIndex = state.allOrders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (existingOrderIndex >= 0) {
        state.allOrders[existingOrderIndex] = {
          ...state.allOrders[existingOrderIndex],
          ...action.payload.updateData,
        };
      }
    },
    deleteOrder(state, action: PayloadAction<{ id: string; label: string }>) {
      if (action.payload.label === "admin") {
        const existingOrder = state.allOrders.find(
          (order) => order.id === action.payload.id
        );
        if (existingOrder?.id) {
          state.allOrders = state.allOrders.filter(
            (order) => order.id !== action.payload.id
          );
          state.allOrdersTotal -= existingOrder.total;
        }
      } else {
        const existingOrder = state.userOrders.find(
          (order) => order.id === action.payload.id
        );
        if (existingOrder?.id) {
          state.userOrders = state.userOrders.filter(
            (order) => order.id !== action.payload.id
          );
          state.userTotal -= existingOrder.total;
        }
      }
    },
    orderLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  fetchOrders,
  getUserOrders,
  createOrder,
  deleteOrder,
  updateOrderByAdmin,
  orderLoading,
} = orderSlice.actions;
export default orderSlice.reducer;
