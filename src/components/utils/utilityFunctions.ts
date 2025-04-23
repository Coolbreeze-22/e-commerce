import { addToCart, addToWishlist } from "../../controller/cartController";
import { ProductType, CartProductType } from "../../states/redux/reducerTypes";

import { NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../../states/redux/store";

interface CategoryNavigationprops {
  itemCategory: string;
  label: string;
  navigate: NavigateFunction;
}

export type AddToCartProps = {
  item: ProductType;
  size: string;
  quantity: number;
  dispatch: AppDispatch;
};

type AddItemToWishlistProps = {
  product: ProductType;
  dispatch: AppDispatch;
};

export const addItemToCart = (data: AddToCartProps) => {
  const { item, size, quantity, dispatch } = data;

  const cartProduct: CartProductType = {
    id: item.id,
    name: item.name,
    brand: item.brand,
    description: item.description,
    category: item.category,
    subCategory: item.subCategory,
    photo: item.photo[0],
    price: item.otherSizeInfo[size].price,
    discountedPrice: item.otherSizeInfo[size].discountedPrice,
    quantity: quantity,
    inStock: item.otherSizeInfo[size].inStock,
    color: item.color,
    size,
  };
  addToCart({ cartProduct, dispatch });
};

export const computeRating = (rating: Array<string>, label: string) => {
  const sumRating = rating.reduce((acc, value) => acc + Number(value), 0);
  const result = sumRating / rating.length;

  const ratingStar = Number(result.toFixed(1));
  const ratingPercent = Math.round(result * 20);
  if (label === "percent") {
    return ratingPercent;
  } else {
    return ratingStar;
  }
};

export const computeDiscountPercent = (
  discountedPrice: number,
  price: number
) => {
  if (!price && !discountedPrice) {
    return 0;
  }
  const discountPercent = Math.ceil((discountedPrice / price - 1) * 100);
  return discountPercent;
};

export const handleCategoryNavigation = (data: CategoryNavigationprops) => {
  const { itemCategory, label, navigate } = data;
  if (label === "category") {
    navigate({
      pathname: "/categories",
      search: `?category=${itemCategory}`,
    });
  } else if (label === "sub-category") {
    navigate({
      pathname: "/categories",
      search: `?sub-category=${itemCategory}`,
    });
  }
};

export const addItemToWishlist = (item: AddItemToWishlistProps) => {
  const { product, dispatch } = item;
  addToWishlist({ product, dispatch });
};
