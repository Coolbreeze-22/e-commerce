import * as reducer from "../states/redux/productReducer";
import { products } from "../dummy/dummyProducts";
import { AppDispatch } from "../states/redux/store";
import {
  initialState,
  InitialStateProps,
} from "../states/redux/productReducer";
import { ProductType } from "../states/redux/reducerTypes";

const initialData: InitialStateProps = { ...initialState, products };

const uniqueCategory: Set<string> = new Set();
const uniqueSubCategory: Set<string> = new Set();

type ItemType1 = {
  category: string;
  label: string;
  product: ProductType;
  uniqueLabel: string;
};
type ItemType2 = Pick<ItemType1, "label"> & { group: string };

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
      if (!uniqueCategory.has(product.category.trim())) {
        groupCategories({ label: "category", group: product.category });
      }
      if (!uniqueSubCategory.has(product.subCategory.trim())) {
        groupCategories({ label: "subCategory", group: product.subCategory });
      }
    }

    dispatchData(dispatch);
  } catch (error: any) {
    dispatch(
      reducer.productError("Something went wrong while fetching products")
    );
  }
};

const groupProducts = (item: ItemType1) => {
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

const groupCategories = (item: ItemType2) => {
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
  dispatch(reducer.getSubCategory(initialData.subCategory));
  dispatch(reducer.productLoading(false));
}
