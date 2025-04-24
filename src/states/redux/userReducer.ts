import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./reducerTypes";

export type InitialStateProps = {
  user: UserProps;
  isLoading: boolean;
};

export const user: UserProps = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  address: "",
  companyName: "",
  apartment: "",
  city: "",
  isAdmin: false,
  isOwner: false,
  password: "",
  createdAt: "",
  updatedAt: "",
};

const initialState: InitialStateProps = {
  user,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    signIn(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    signOut(state) {
      state.user = user;
      state.isLoading= false;
    },
    updateUser(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    deleteUser(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    userLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  signUp,
  signIn,
  signOut,
  updateUser,
  deleteUser,
  userLoading,
} = userSlice.actions;
export default userSlice.reducer;
