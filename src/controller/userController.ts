// import { auth, createUserWithEmailAndPassword } from "../config/firebase";
import * as reducer from "../states/redux/userReducer";
import { AppDispatch } from "../states/redux/store";
import { user } from "../dummy/dummyUser";
import { user as userObj } from "../states/redux/userReducer";
import { UserProps } from "../states/redux/reducerTypes";
import { toastNotification } from "../components/utils/toastNotification";
import { NavigateFunction } from "react-router-dom";

interface AuthProps {
  email: string;
  phoneNumber: string;
  password: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}
interface SignOutProps {
  navigate: NavigateFunction;
  dispatch: AppDispatch;
}

const newUser: UserProps = { ...userObj };

export const signUp = async (item: AuthProps) => {
  const {
    // email,
    // phoneNumber,
    // password,
    dispatch,
    navigate,
  } = item;
  // const data = { email, phoneNumber, password };
  // data will be sent to firebase
  try {
    dispatch(reducer.signUp(user));
    navigate("/");
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

export const signIn = async (item: AuthProps) => {
  const {
    // email,
    // phoneNumber,
    // password,
    dispatch,
    navigate,
  } = item;
  // const data = { email, phoneNumber, password };
  // data will be sent to firebase
  try {
    dispatch(reducer.signIn(user));
    navigate(-1);
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};
export const signOut = async (hooks: SignOutProps) => {
  const { navigate, dispatch } = hooks;
  try {
    dispatch(reducer.signOut());
    navigate('/login');
  } catch (error) {
    toastNotification("Sign out failed !", "error");
  }
};

export const deleteUser = async (dispatch: AppDispatch) => {
  try {
    // setDoc(newUser) set this to firebase and dispatch data returned
    // dispatch(reducer.deleteUser(data));this is the main code
    dispatch(reducer.deleteUser(newUser));
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};
