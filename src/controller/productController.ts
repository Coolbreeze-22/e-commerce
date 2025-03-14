import * as reducer from "../states/redux/productReducer";
import { products } from "../dummy/dummyProducts";
import { AppDispatch } from "../states/redux/store";
import {
  initialState,
  InitialStateProps,
} from "../states/redux/productReducer";
import { ProductType } from "../states/redux/reducerTypes";

const initialData: InitialStateProps = { ...initialState, products };
const uniqueCategories: Set<string> = new Set();

type ItemType = {
  category: string;
  label: string;
  product: ProductType;
  uniqueLabel: string;
};

export const fetchProducts = async (dispatch: AppDispatch) => {
  try {
    for (const product of products) {
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

      if (!uniqueCategories.has(product.category)) {
        initialData.category = [...initialData.category, product.category];
        uniqueCategories.add(product.category);
      }
    }

    dispatchData(dispatch);
  } catch (error: any) {
    dispatch(reducer.productError(error.message));
  }
};



const groupProducts = (item: ItemType) => {
  const { product, label, category, uniqueLabel } = item;
  const labelAndCategory = `${label}-${category}`;

  initialData[label] = [...initialData[label], product];
  if (!uniqueCategories.has(`${label}-${category}`)) {
    initialData[uniqueLabel] = [...initialData[uniqueLabel], product];
    uniqueCategories.add(labelAndCategory);
    return true;
  }
  return false;
};

function dispatchData(dispatch: AppDispatch) {
  dispatch(reducer.productLoading(true));
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
  dispatch(reducer.productLoading(false));
}
