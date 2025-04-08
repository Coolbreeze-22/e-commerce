// import { auth, createUserWithEmailAndPassword } from "../config/firebase";
import * as reducer from "../states/redux/userReducer";
import { AppDispatch } from "../states/redux/store";
import { user } from "../dummy/dummyUser";
import { user as userObj } from "../states/redux/userReducer";
import { UserProps } from "../states/redux/reducerTypes";
import { toastNotification } from "../components/utils/toastNotification";

interface ItemProps {
  email: string;
  phoneNumber: string;
  password: string;
}
const newUser: UserProps = {...userObj}

export const signUp = async (dispatch: AppDispatch) => {
  try {
    dispatch(reducer.signUp(user));
  } catch (error: any) {
      toastNotification(error.message, "error");
  }
};

export const signIn = async (item: ItemProps, dispatch: AppDispatch) => {
  try {
    console.log("logged to remove ts warnig", item)
    dispatch(reducer.signIn(user));
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};
export const signOut = async (dispatch: AppDispatch) => {
  try {
    dispatch(reducer.signOut());
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
