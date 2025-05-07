import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserProps } from "./reducerTypes";

export type InitialStateProps = {
  users: Array<UserProps>;
  user: UserProps;
  isLoading: boolean;
};

export const userInitialState: UserProps = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  emailVerified: false,
  phoneNumber: "",
  photoUrl: "",
  address: "",
  companyName: "",
  apartment: "",
  city: "",
  isAdmin: false,
  isOwner: false,
  isSignedIn: false,
  lastLoginAt: "",
  lastLogoutAt: "",
  createdAt: "",
  updatedAt: "",
};

const initialState: InitialStateProps = {
  users: [],
  user: userInitialState,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers(state, action: PayloadAction<Array<UserProps>>) {
      state.users = action.payload;
    },
    signUp(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    signIn(state, action: PayloadAction<UserProps>) {
      state.user = action.payload;
    },
    logOut(state) {
      state.user = userInitialState;
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
