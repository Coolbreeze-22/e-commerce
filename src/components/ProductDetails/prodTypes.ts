import {
    ProductType,
  } from "../../states/redux/reducerTypes";
  import { Dispatch, SetStateAction } from "react";
  // import { NavigateFunction } from "react-router-dom";

export interface SumProps {
  label: string;
  quantity: number;
  selectedProduct: ProductType | null;
  setQuantity: Dispatch<SetStateAction<number>>;
}
export interface SelectedColorProps {
  color: string;
  allProducts: ProductType[];
  selectedProduct: ProductType | null;
  setSelectedProduct: Dispatch<SetStateAction<ProductType | null>>;
  // navigate: NavigateFunction;
}


