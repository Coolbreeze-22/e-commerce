import { addToCart } from "../../../controller/cartController";
import { CartProductType } from "../../../states/redux/reducerTypes";
import {
  AddToCartProps,
  SumProps,
  SelectedColorProps,
} from "./prodTypes";

export const handleAddToCart = (data: AddToCartProps) => {
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
    inStock: item.otherSizeInfo[size].quantity,
    color: item.color,
    size,
  };

  addToCart({ cartProduct, dispatch });
};

export const handleSum = (data: SumProps) => {
  const { label, quantity, selectedProduct, setQuantity } = data;

  if (!selectedProduct) {
    return;
  }
  const isIncrement =
    label === "increment" && quantity < selectedProduct.quantity;
  const isDecrement = label === "decrement" && quantity > 1;

  setQuantity((prevQuantity) =>
    isIncrement ? prevQuantity + 1 : isDecrement ? prevQuantity - 1 : quantity
  );
};

export const handleSelectedColor = (data: SelectedColorProps) => {
  const { color, allProducts, selectedProduct, setSelectedProduct } =
    data;
  if (!selectedProduct) {
    return;
  }
  const similarProduct = allProducts.find(
    (item) =>
      item.id !== selectedProduct.id &&
      item.name === selectedProduct.name &&
      item.color === color
  );
  if (similarProduct) {
    setSelectedProduct(similarProduct);
    // navigate(`/account/product-details/${similarProduct.id}`);
  }
};

