import {
  auth,
  fireStore,
  collection,
  doc,
  updateDoc,
  getDocs,
  addDoc,
  deleteDoc,
} from "../config/firebase";
import * as reducer from "../states/redux/productReducer";
import { AppDispatch } from "../states/redux/store";
import { initialState } from "../states/redux/productReducer";
import { InitialStateProps, ProductType } from "../states/redux/reducerTypes";
// import { flashSaleCountdown } from "../dummy/dummyCountdown";
import { toastNotification } from "../components/utils/toastNotification";

interface CreateProductProps {
  product: ProductType;
  isAdmin: boolean;
  dispatch: AppDispatch;
}
interface UpdateProductByAdminProps {
  product: ProductType;
  isAdmin: boolean;
  dispatch: AppDispatch;
}
const initialData: InitialStateProps = {
  ...initialState,
};

const uniqueCategory: Set<string> = new Set();
const uniqueSubCategory: Set<string> = new Set();

type GroupProductsProps = {
  category: string;
  label: string;
  product: ProductType;
  uniqueLabel: string;
};
type GroupCategoriesProps = Pick<GroupProductsProps, "label"> & {
  group: string;
};

export const fetchProducts = async (dispatch: AppDispatch) => {
  try {
    dispatch(reducer.productLoading(true));
    const colRef = collection(fireStore, "products");
    const querySnapshot = await getDocs(colRef);

    for (const doc of querySnapshot.docs) {
      const product = doc.data() as ProductType;
      initialData.products = [...initialData.products, product];
      if (product.isFlashSales) {
        groupProducts({
          product,
          label: "flashSales",
          category: product.category,
          uniqueLabel: "uniqueFlashSales",
        });
      }
      if (product.isBestSelling) {
        groupProducts({
          product,
          label: "bestSelling",
          category: product.category,
          uniqueLabel: "uniqueBestSelling",
        });
      }
      if (product.isExplore) {
        groupProducts({
          product,
          label: "explore",
          category: product.category,
          uniqueLabel: "uniqueExplore",
        });
      }
      if (product.isNewArrival) {
        groupProducts({
          product,
          label: "newArrival",
          category: product.category,
          uniqueLabel: "uniqueNewArrival",
        });
      }
      if (!uniqueCategory.has(product.category.trim())) {
        groupCategories({ label: "category", group: product.category });
      }
      if (!uniqueSubCategory.has(product.subCategory.trim())) {
        groupCategories({ label: "subCategory", group: product.subCategory });
      }
    }

    dispatchData(dispatch);
  } catch (error: any) {
    dispatch(reducer.productLoading(false));
    toastNotification(error.message, "error");
  }
};

export const createProduct = async (data: CreateProductProps) => {
  const { product, isAdmin, dispatch } = data;
  try {
    dispatch(reducer.productLoading(true));
    if (auth.currentUser?.uid && isAdmin) {
      const colRef = collection(fireStore, "products");
      const docRef = await addDoc(colRef, product);
      await updateDoc(docRef, {
        id: docRef.id,
        createdAt: Date.now().toString(),
      });
      const productData = { ...product, id: docRef.id };
      dispatch(reducer.createProduct(productData));
      toastNotification("Product created successfully", "success");
    } else {
      toastNotification("Forbidden: Admin access required.", "error");
    }
    dispatch(reducer.productLoading(false));
  } catch (error: any) {
    dispatch(reducer.productLoading(false));
    toastNotification(error.message, "error");
  }
};

export const updateProductByAdmin = async (data: UpdateProductByAdminProps) => {
  const { product, isAdmin, dispatch } = data;
  try {
    if (auth.currentUser?.uid && isAdmin) {
      const docRef = doc(fireStore, "products", product.id);
      const newDate = Date.now().toString();
      await updateDoc(docRef, { ...product, updatedAt: newDate });
      dispatch(
        reducer.updateProductByAdmin({
          ...product,
          updatedAt: newDate,
        })
      );
      toastNotification("Product updated successfully !", "success");
    } else if (auth.currentUser?.uid && isAdmin) {
      toastNotification("Forbidden: Admin access required.", "error");
    } else {
      toastNotification("Sign in to complete this action !", "warning");
    }
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

export const deleteProductByAdmin = async (
  id: string,
  dispatch: AppDispatch
) => {
  try {
    if (auth.currentUser?.uid) {
      const docRef = doc(fireStore, "products", id);
      await deleteDoc(docRef);
      dispatch(reducer.deleteProductByAdmin(id));
      toastNotification("Product deleted successfully !", "success");
    } else {
      toastNotification("Sign in to complete this action !", "warning");
    }
  } catch (error: any) {
    toastNotification(error.message, "error");
  }
};

const groupProducts = (item: GroupProductsProps) => {
  const { product, label, category, uniqueLabel } = item;
  const labelAndCategory = `${label}-${category.trim()}`;

  initialData[label] = [...(initialData[label] as ProductType[]), product];

  if (!uniqueCategory.has(labelAndCategory)) {
    initialData[uniqueLabel] = [
      ...(initialData[uniqueLabel] as ProductType[]),
      product,
    ];
    uniqueCategory.add(labelAndCategory);
  }
};

const groupCategories = (item: GroupCategoriesProps) => {
  const { label, group } = item;
  const currentCategory = group.trim();

  initialData[label] = [...(initialData[label] as string[]), currentCategory];

  if (label === "category") {
    uniqueCategory.add(currentCategory);
  } else {
    uniqueSubCategory.add(currentCategory);
  }
};

function dispatchData(dispatch: AppDispatch) {
  dispatch(reducer.getProducts(initialData.products));

  dispatch(reducer.getFlashSales(initialData.flashSales));
  dispatch(reducer.getBestSelling(initialData.bestSelling));
  dispatch(reducer.getExplore(initialData.explore));
  dispatch(reducer.getNewArrival(initialData.newArrival));
  dispatch(reducer.getUniqueFlashSales(initialData.uniqueFlashSales));
  dispatch(reducer.getUniqueBestSelling(initialData.uniqueBestSelling));
  dispatch(reducer.getUniqueExplore(initialData.uniqueExplore));
  dispatch(reducer.getUniqueNewArrival(initialData.uniqueNewArrival));
  dispatch(reducer.getCategory(initialData.category));
  dispatch(reducer.getSubCategory(initialData.subCategory));
  dispatch(reducer.productLoading(false));
}
