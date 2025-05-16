import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  // sendEmailVerification,
  signOut,
  deleteUser,
  fireStore,
  updateDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  deleteDoc,
  setDoc,
} from "../config/firebase";
import * as reducer from "../states/redux/userReducer";
import { AppDispatch } from "../states/redux/store";
import { UserProps } from "../states/redux/reducerTypes";
import { toastNotification } from "../components/utils/toastNotification";
import { NavigateFunction } from "react-router-dom";
import { initialState } from "../constants/user";
import { useEffect } from "react";

interface AuthProps {
  email: string;
  password: string;
  navigate: NavigateFunction;
  dispatch: AppDispatch;
}
interface GetUsersProps {
  id: string;
  dispatch: AppDispatch;
  length: number;
}
interface ResetPasswordProps {
  email: string;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

export const useGetUsers = async (data: GetUsersProps) => {
  const { id, dispatch, length } = data;
  useEffect(() => {
    async function getUsers() {
      // to prevent infinite loop and unnecessary getquests
      if (length) {
        return;
      }
      try {
        // dispatch(reducer.userLoading(true));
        if (id) {
          const colRef = collection(fireStore, "users");
          const querySnapshot = await getDocs(colRef);
          const users: Array<UserProps> = [];
          querySnapshot.forEach((doc) => {
            users.push({ ...doc.data() } as UserProps);
          });
          dispatch(reducer.getUsers(users));
        }
        // the below isnt part of the redux infinte loop problem, but i still removed it

        dispatch(reducer.userLoading(false));
      } catch (error: any) {
        toastNotification(error.message, "error");
        dispatch(reducer.userLoading(false));
      }
    }
    getUsers();
  }, []);
};

export const signUp = async (item: AuthProps) => {
  const { email, password, navigate, dispatch } = item;
  dispatch(reducer.userLoading(true));
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const docRef = doc(fireStore, "users", user.uid);
    const newProfile = createUserProfile(user);
    await setDoc(docRef, newProfile);
    const docSnap = await getDoc(docRef);
    dispatch(reducer.signUp({ ...docSnap.data() } as UserProps));
    dispatch(reducer.userLoading(false));
    navigate(-1);
  } catch (error: any) {
    toastNotification(error.message, "error");
    dispatch(reducer.userLoading(false));
  }
};

export const signIn = async (item: AuthProps) => {
  const { email, password, navigate, dispatch } = item;
  dispatch(reducer.userLoading(true));
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const docRef = doc(fireStore, "users", user.uid);
    await updateDoc(docRef, {
      isSignedIn: true,
      lastLoginAt: Date.now().toString(),
    });
    const docSnap = await getDoc(docRef);
    dispatch(reducer.signIn({ ...docSnap.data() } as UserProps));
    dispatch(reducer.userLoading(false));
    navigate(-1);
  } catch (error: any) {
    toastNotification(error.message, "error");
    dispatch(reducer.userLoading(false));
  }
};

export const logOut = async (
  navigate: NavigateFunction,
  dispatch: AppDispatch
) => {
  dispatch(reducer.userLoading(true));
  try {
    const currentUser = auth.currentUser;
    if (!currentUser?.uid) {
      throw new Error("User not signed in !");
    }

    const docRef = doc(fireStore, "users", currentUser.uid);
    await updateDoc(docRef, {
      lastLogoutAt: Date.now().toString(),
      isSignedIn: false,
    });

    await signOut(auth);
    dispatch(reducer.logOut());
    dispatch(reducer.userLoading(false));
    navigate("/");
  } catch (error: any) {
    toastNotification(error.message, "error");
    dispatch(reducer.userLoading(false));
  }
};

export const resetPassword = async (data: ResetPasswordProps) => {
  const { email, dispatch, navigate } = data;
  dispatch(reducer.userLoading(true));
  try {
    await sendPasswordResetEmail(auth, email);
    toastNotification("Password reset email sent!", "success");
    dispatch(reducer.userLoading(false));
    navigate("/login");
  } catch (error: any) {
    toastNotification(error.message, "error");
    dispatch(reducer.userLoading(false));
  }
};

export const updateProfile = async (data: UserProps, dispatch: AppDispatch) => {
  try {
    if (auth.currentUser?.uid) {
      const docRef = doc(fireStore, "users", auth.currentUser.uid);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Date.now().toString(),
      });
      dispatch(reducer.updateProfile(data));
      toastNotification("Profile updated successfully !", "success");
    } else {
      toastNotification("Sign in to complete this action !", "warning");
    }
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

export const deleteMyAccount = async (
  id: string,
  navigate: NavigateFunction
) => {
  try {
    if (auth.currentUser?.uid) {
      const docRef = doc(fireStore, "users", id);

      await deleteDoc(docRef);
      await deleteUser(auth.currentUser);
      await signOut(auth);
      navigate("/register");
      toastNotification("Account deleted successfully !", "success");
    } else {
      toastNotification("Sign in to complete this action !", "warning");
    }
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

const createUserProfile = (user: any) => {
  const userProfile = {
    ...initialState,
    id: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
    isSignedIn: true,
    lastLoginAt: user.metadata.lastLoginAt,
    createdAt: user.metadata.createdAt,
  };
  return userProfile;
};

// interface VerifyEmailProps {
//   dispatch: AppDispatch;
// }

// export const verifyEmail = async (data: VerifyEmailProps) => {
//   const { dispatch } = data;
//   dispatch(reducer.userLoading(true));
//   try {
//     if (auth.currentUser) {
//       await sendEmailVerification(auth.currentUser);
//       toastNotification("Email verification sent!", "success");
//     } else {
//       toastNotification("User not signed in!", "error");
//     }
//     dispatch(reducer.userLoading(false));
//   } catch (error: any) {
//     toastNotification(error.message, "error");
//     dispatch(reducer.userLoading(false));
//   }
// };
