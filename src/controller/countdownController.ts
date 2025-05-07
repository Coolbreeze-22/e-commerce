import {
  auth,
  fireStore,
  collection,
  //   doc,
  updateDoc,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "../config/firebase";
import * as reducer from "../states/redux/countdownReducer";
import { AppDispatch } from "../states/redux/store";
import { CountdownType } from "../states/redux/reducerTypes";
import { toastNotification } from "../components/utils/toastNotification";

interface CreateFlashsaleCountdownProps {
  countdown: CountdownType;
  isAdmin: boolean;
  dispatch: AppDispatch;
}

export const getCountdown = async (dispatch: AppDispatch) => {
  try {
    const colRef = collection(fireStore, "countdown");
    const querySnapshot = await getDocs(colRef);
    const countdowns: Array<CountdownType> = [];
    querySnapshot.forEach((doc) => {
      countdowns.push({ ...doc.data() } as CountdownType);
    });
    dispatch(reducer.getCountdown(countdowns));
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

export const createCountdown = async (data: CreateFlashsaleCountdownProps) => {
  const { countdown, isAdmin, dispatch } = data;
  try {
    if (auth.currentUser?.uid && isAdmin) {
      const colRef = collection(fireStore, "countdown");
      const docRef = await addDoc(colRef, countdown);
      await updateDoc(docRef, {
        id: docRef.id,
      });
      const countdownData = { ...countdown, id: docRef.id };
      dispatch(reducer.createCountdown(countdownData));
      toastNotification("Countdown created successfully", "success");
    } else {
      toastNotification("Forbidden: Admin access required.", "error");
    }
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

export const deleteCountdown = async (id: string, dispatch: AppDispatch) => {
  try {
    if (auth.currentUser?.uid) {
      const docRef = doc(fireStore, "countdown", id);
      await deleteDoc(docRef);
      dispatch(reducer.deleteCountdown(id));
      toastNotification("Countdown deleted successfully !", "success");
    } else {
      toastNotification("Sign in to complete this action !", "warning");
    }
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};
