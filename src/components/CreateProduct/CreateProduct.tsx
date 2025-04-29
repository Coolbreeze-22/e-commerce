import { useState } from "react";
import CustomInput from "../CustomInput/CustomInput";
import "./CreateProduct.css";
import { ProductType } from "../../states/redux/reducerTypes";

const CreateProduct = () => {
  const initialState = {
    id: "",
    name: "",
    brand: "",
    description: "",
    category: "",
    subCategory: "",
    photo: [],
    price: 0,
    discountedPrice: null,
    rating: [],
    reviews: [],
    inStock: 0,
    likes: [],
    views: [],
    color: "",
    allColors: [],
    size: "",
    allSizes: [],
    isNewArrival: false,
    isFlashSales: false,
    isExplore: false,
    isBestSelling: false,
    otherSizeInfo: {
      XS: { inStock: 0, price: 0, discountedPrice: 0 },
      S: { inStock: 0, price: 0, discountedPrice: 0 },
      M: { inStock: 0, price: 0, discountedPrice: 0 },
      L: { inStock: 0, price: 0, discountedPrice: 0 },
      XL: { inStock: 0, price: 0, discountedPrice: 0 },
    },
    createdAt: "",
    upDatedAt: "",
  }
  const [formData, setFormData] = useState<ProductType>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev: ProductType) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="create-container">
      <form>
        <CustomInput
          autoFocus
          type="text"
          name="firstName"
          placeholder="Md"
          className="editProf-input-1"
          value={formData.name}
          onChange={handleChange}
        />
      </form>
    </main>
  );
};

export default CreateProduct;
