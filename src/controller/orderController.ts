import {
  auth,
  fireStore,
  collection,
  updateDoc,
  getDocs,
  addDoc,
  // query,
  // where,
  doc,
  deleteDoc,
} from "../config/firebase";
import * as reducer from "../states/redux/orderReducer";
import { AppDispatch } from "../states/redux/store";
import { OrderProps } from "../states/redux/reducerTypes";
import { clearCart } from "../states/redux/cartReducer";
import { NavigateFunction } from "react-router-dom";
import { toastNotification } from "../components/utils/toastNotification";
import { useEffect } from "react";

interface CreateOrderProps {
  order: OrderProps;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}
type GetOrdersProps = Pick<CreateOrderProps, "dispatch"> & {
  id: string;
  length: number;
};

interface UpdateOrderProps {
  id: string;
  updateData: {
    orderStatus?: string;
    paymentStatus?: string;
  };
  dispatch: AppDispatch;
}
interface DeleteOrderProps {
  id: string;
  label: string;
  dispatch: AppDispatch;
}

export const useFetchOrders = (data: GetOrdersProps) => {
  const { id, dispatch, length } = data;
  useEffect(() => {
    const fetchOrders = async () => {
      // to prevent infinite loop and unnecessary getquests
      if (length) {
        return;
      }
      try {
        dispatch(reducer.orderLoading(true));
        if (id) {
          const colRef = collection(fireStore, "orders");
          const querySnapshot = await getDocs(colRef);
          const orders: Array<OrderProps> = [];
          querySnapshot.forEach((doc) => {
            orders.push({ ...doc.data(), id: doc.id } as OrderProps);
          });
          dispatch(reducer.fetchOrders(orders));
        }
        dispatch(reducer.orderLoading(false));
      } catch (error: any) {
        dispatch(reducer.orderLoading(false));
        toastNotification(error.message, "error");
      }
    };
    fetchOrders();
  }, []);
};

export const createOrder = async (data: CreateOrderProps) => {
  const { order, dispatch, navigate } = data;
  try {
    dispatch(reducer.orderLoading(true));
    if (auth.currentUser?.uid) {
      const colRef = collection(fireStore, "orders");
      const docRef = await addDoc(colRef, order);
      await updateDoc(docRef, {
        id: docRef.id,
      });
      const orderData = { ...order, id: docRef.id };
      dispatch(reducer.createOrder(orderData));
      dispatch(clearCart());
      dispatch(reducer.orderLoading(false));
      navigate("/account", { state: { to: "orders" }, replace: true });
      toastNotification("Order created successfully", "success");
    }
  } catch (error: any) {
    dispatch(reducer.orderLoading(false));
    toastNotification(error.message, "error");
  }
};

export const updateOrderByAdmin = async (data: UpdateOrderProps) => {
  const { id, updateData, dispatch } = data;
  try {
    if (auth.currentUser?.uid) {
      const docRef = doc(fireStore, "orders", id);
      const newDate = Date.now().toString();
      await updateDoc(docRef, {
        ...updateData,
        updatedAt: newDate,
      });
      dispatch(
        reducer.updateOrderByAdmin({
          id,
          updateData: { ...updateData, updatedAt: newDate },
        })
      );
      toastNotification("Order updated successfully !", "success");
    } else {
      toastNotification("Sign in to complete this action !", "warning");
    }
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

export const deleteOrder = async (data: DeleteOrderProps) => {
  const { id, label, dispatch } = data;
  try {
    if (auth.currentUser?.uid) {
      const docRef = doc(fireStore, "orders", id);
      await deleteDoc(docRef);
      dispatch(reducer.deleteOrder({ id, label }));
      toastNotification("Order deleted successfully !", "success");
    } else {
      toastNotification("Sign in to complete this action !", "warning");
    }
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

// export const getUserOrders = async (data: GetOrdersProps) => {
//   const { id, dispatch } = data;
//   try {
//     dispatch(reducer.orderLoading(true));
//     if (id) {
//       const colRef = collection(fireStore, "orders");
//       const perUserOrdersQuery = query(colRef, where("userId", "==", id));
//       const querySnapshot = await getDocs(perUserOrdersQuery);
//       const orders: Array<OrderProps> = [];
//       querySnapshot.forEach((doc) => {
//         orders.push({ ...doc.data() } as OrderProps);
//       });
//       dispatch(reducer.getUserOrders(orders));
//     }
//     dispatch(reducer.orderLoading(false));
//   } catch (error: any) {
//     dispatch(reducer.orderLoading(false));
//     toastNotification(error.message, "error");
//   }
// };
