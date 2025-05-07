import { SumProps, SelectedColorProps } from "./prodTypes";

export const handleSum = (data: SumProps) => {
  const { label, quantity, selectedProduct, setQuantity } = data;

  if (!selectedProduct) {
    return;
  }
  const isIncrement =
    label === "increment" && quantity < selectedProduct.inStock;
  const isDecrement = label === "decrement" && quantity > 1;

  setQuantity((prevQuantity) =>
    isIncrement ? prevQuantity + 1 : isDecrement ? prevQuantity - 1 : quantity
  );
};

export const handleSelectedColor = (data: SelectedColorProps) => {
  const { color, allProducts, selectedProduct, setSelectedProduct } = data;
  if (!selectedProduct) {
    return;
  }
  const similarProduct = allProducts.find(
    (item) =>
      // item.id !== selectedProduct.id &&
      item.name === selectedProduct.name &&
      item.color === color
  );
  if (similarProduct) {
    setSelectedProduct(similarProduct);
    // navigate(`/account/product-details/${similarProduct.id}`);
  }
};
