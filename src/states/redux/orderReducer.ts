import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OrderProps } from "./reducerTypes";

export type OrderInitialStateProps = {
  userOrders: Array<OrderProps>;
  allUsersOrders: Array<OrderProps>;
  userTotal: number;
  allUsersTotal: number;
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
  allUsersOrders: [],
  userTotal: 0,
  allUsersTotal: 0,
  isLoading: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: orderInitialState,
  reducers: {
    getAllUsersOrders(state, action: PayloadAction<Array<OrderProps>>) {
      state.allUsersOrders = action.payload;
      state.allUsersTotal = action.payload.reduce(
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
      const existingOrderIndex = state.allUsersOrders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (existingOrderIndex>=0) {
        state.allUsersOrders[existingOrderIndex] = {
          ...state.allUsersOrders[existingOrderIndex],
          ...action.payload.updateData,
        };
      }
    },
    deleteOrder(state, action: PayloadAction<{ id: string; label: string }>) {
      if (action.payload.label === "admin") {
        const existingOrder = state.allUsersOrders.find(
          (order) => order.id === action.payload.id
        );
        if (existingOrder?.id) {
          state.allUsersOrders = state.allUsersOrders.filter(
            (order) => order.id !== action.payload.id
          );
          state.allUsersTotal -= existingOrder.total;
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
  getAllUsersOrders,
  getUserOrders,
  createOrder,
  deleteOrder,
  updateOrderByAdmin,
  orderLoading,
} = orderSlice.actions;
export default orderSlice.reducer;
