import { NavigateFunction } from "react-router-dom";

interface CategoryNavigationprops {
  itemCategory: string;
  label: string;
  navigate: NavigateFunction;
}

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
  discountedPrice: string,
  price: string
) => {
  if (!price && !discountedPrice) {
    return 0;
  }
  const discountPercent = Math.ceil(
    (parseFloat(discountedPrice) / parseFloat(price) - 1) * 100
  );
  return discountPercent;
};

export const handleCategoryNavigation = (
  data: CategoryNavigationprops
) => {
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
