import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./reducerTypes";

export type InitialStateProps = {
  users: Array<UserProps>;
  notification: string;
  isLoading: boolean;
  error: string;
};

const initialState: InitialStateProps = {
  users: [],
  notification: "",
  isLoading: false,
  error: "",
};

const adminSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getUsers(state, action: PayloadAction<Array<UserProps>>) {
      state.users = action.payload;
    },
    updateUser(state, action: PayloadAction<UserProps>) {
      const existingUserIndex = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (existingUserIndex !== -1) {
        state.users[existingUserIndex] = action.payload;
      }
    },
    deleteUser(state, action: PayloadAction<Array<UserProps>>) {
      state.users = action.payload;
    },
    deleteAllUser(state, action: PayloadAction<[]>) {
      state.users = action.payload;
    },
    userLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    userError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { getUsers, updateUser, deleteUser, deleteAllUser, userLoading, userError } =
adminSlice.actions;
export default adminSlice.reducer;
