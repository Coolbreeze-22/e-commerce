import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./reducerTypes";
import isEqual from "lodash/isEqual";
import { initialState as initial } from "../../constants/user";

export type InitialStateProps = {
  users: Array<UserProps>;
  user: UserProps;
  isLoading: boolean;
};

const initialState: InitialStateProps = {
  users: [],
  user: { ...initial },
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers(state, action: PayloadAction<Array<UserProps>>) {
      if (!isEqual(state.users, action.payload)) {
        state.users = action.payload;
      }
    },
    signUp(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    signIn(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = { ...initial };
      state.users = [];
    },
    updateProfile(state, action: PayloadAction<UserProps>) {
      state.user = { ...action.payload };
    },
    userLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { getUsers, signUp, signIn, logOut, updateProfile, userLoading } =
  userSlice.actions;
export default userSlice.reducer;
