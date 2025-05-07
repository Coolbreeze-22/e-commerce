import { useState } from "react";
import "./UpdateProduct.css";
import { ProductType } from "../../states/redux/reducerTypes";
import Navbar from "../Navbar/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { initialState } from "../../constants/product";
import {
  arrayValueProps,
  sizeInfoProps,
} from "../CreateProduct/CreateProductType";
import CustomButton from "../CustomButton/CustomButton";
import CustomInput from "../CustomInput/CustomInput";
import { updateProductByAdmin } from "../../controller/productController";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import FileBase64 from "react-file-base64";
import { MdCancel } from "react-icons/md";

const UpdateProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { products } = useSelector((state: RootState) => state.productReducer);
  const arrayValueInitial = { name: "", value: "" };
  const sizeInfoInitial = { inStock: 0, price: 0, discountedPrice: 0 };

  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  const [formData, setFormData] = useState<ProductType>(
    product ?? initialState
  );

  const [arrayValue, setArrayValue] =
    useState<arrayValueProps>(arrayValueInitial);
  const [sizeInfo, setSizeInfo] = useState<sizeInfoProps>(sizeInfoInitial);
  const [sizeName, setSizeName] = useState("");
  const [otherSizeWarning, setOtherSizeWarning] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProductByAdmin({
      product: formData,
      isAdmin: user.isAdmin,
      dispatch,
    });
    close();
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = event.target;
    const { checked } = event.target as HTMLInputElement;
    setFormData((prev: ProductType) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleChangeForArray = () => {
    const { value, name } = arrayValue;
    if (value.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        [name]: [...(prev[name] as Array<string>), value.trim()],
      }));
      setArrayValue(arrayValueInitial);
    }
  };

  const handleChangeforotherSizeInfo = () => {
    if (!sizeName) {
      setOtherSizeWarning("select size");
    } else if (!sizeInfo.price) {
      setOtherSizeWarning("Add price");
    } else if (!sizeInfo.discountedPrice) {
      setOtherSizeWarning("Add discounted Price");
    } else if (!sizeInfo.inStock) {
      setOtherSizeWarning("Add instock");
    } else {
      setFormData((prev) => ({
        ...prev,
        otherSizeInfo: { ...prev.otherSizeInfo, [sizeName]: sizeInfo },
      }));
      setSizeInfo(sizeInfoInitial);
      setSizeName("");
      setOtherSizeWarning("");
    }
  };

  const updateArrayValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setArrayValue({ value, name });
  };
  const updateSizeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSizeInfo((prev) => ({ ...prev, [name]: Number(value) }));
  };

  function close() {
    setFormData(initialState);
    setArrayValue(arrayValueInitial);
    setSizeInfo(sizeInfoInitial);
    setSizeName("");
  }

  return (
    <Navbar>
      <main className="update-container">
        <div className="update-routes">
          <aside className="update-route1" onClick={() => navigate("/")}>
            Home
          </aside>
          <aside className="update-route-slash">/</aside>
          <aside className="update-route1" onClick={() => navigate(-1)}>
            admin
          </aside>
          <aside className="update-route-slash">/</aside>
          <aside className="update-route2">update</aside>
        </div>

        <div className="update-body">
          <section className="update-img">
            {formData.photo.map((item, index) => (
              <div key={index}>
                <MdCancel
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      photo: prev.photo.filter((img) => img !== item),
                    }))
                  }
                  className="update-remove-icon"
                />
                <img src={item} alt="loading" loading="lazy" />
              </div>
            ))}
          </section>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <CustomInput
                autoFocus
                type="text"
                name="name"
                placeholder="Name"
                className="create-input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Brand</label>
              <CustomInput
                type="text"
                name="brand"
                placeholder="Brand"
                className="create-input"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description</label>
              <CustomInput
                type="text"
                name="description"
                placeholder="Description"
                className="create-input"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Category</label>
              <CustomInput
                type="text"
                name="category"
                placeholder="Category"
                className="create-input"
                value={formData.category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Sub Category</label>
              <CustomInput
                type="text"
                name="subCategory"
                placeholder="Sub Category"
                className="create-input"
                value={formData.subCategory}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Price</label>
              <CustomInput
                type="number"
                name="price"
                placeholder="Price"
                className="create-input"
                value={formData.price !== 0 ? formData.price : ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Discounted Price</label>
              <CustomInput
                type="number"
                name="discountedPrice"
                placeholder="Discounted Price"
                className="create-input"
                value={
                  formData.discountedPrice !== null
                    ? formData.discountedPrice
                    : ""
                }
                onChange={handleChange}
              />
            </div>
            <div>
              <label>InStock</label>
              <CustomInput
                type="number"
                name="inStock"
                placeholder="InStock"
                className="create-input"
                value={formData.inStock !== 0 ? formData.inStock : ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Color</label>
              <CustomInput
                type="text"
                name="color"
                placeholder="Color"
                className="create-input"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>All Colors</label>
              <CustomInput
                type="text"
                name="allColors"
                placeholder="All Colors"
                className="create-input"
                value={arrayValue.name === "allColors" ? arrayValue.value : ""}
                onChange={updateArrayValue}
              />
              {arrayValue.name === "allColors" && arrayValue.value && (
                <button type="button" onClick={handleChangeForArray}>
                  Add
                </button>
              )}
            </div>
            <div>
              <label>Size</label>
              <select
                name="size"
                className="create-input"
                value={formData.size}
                onChange={handleChange}
              >
                <option value="" disabled>
                  size
                </option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
            </div>
            <div>
              <label>allSizes</label>
              <select
                name="allSizes"
                className="create-input"
                value={arrayValue.name === "allSizes" ? arrayValue.value : ""}
                onChange={updateArrayValue}
              >
                <option value="" disabled>
                  All Sizes
                </option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </select>
              {arrayValue.name === "allSizes" && arrayValue.value && (
                <button type="button" onClick={handleChangeForArray}>
                  Add
                </button>
              )}
            </div>
            <div>
              <label>Likes</label>
              <CustomInput
                type="text"
                name="likes"
                placeholder="Likes"
                className="create-input"
                value={arrayValue.name === "likes" ? arrayValue.value : ""}
                onChange={updateArrayValue}
              />
              {arrayValue.name === "likes" && arrayValue.value && (
                <button type="button" onClick={handleChangeForArray}>
                  Add
                </button>
              )}
            </div>
            <div>
              <label>Rating</label>
              <select
                name="rating"
                className="create-input"
                value={arrayValue.name === "rating" ? arrayValue.value : ""}
                onChange={updateArrayValue}
              >
                <option value="" disabled>
                  Rating
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              {arrayValue.name === "rating" && arrayValue.value && (
                <button type="button" onClick={handleChangeForArray}>
                  Add
                </button>
              )}
            </div>
            <div>
              <label>Reviews</label>
              <CustomInput
                type="text"
                name="reviews"
                placeholder="Reviews"
                className="create-input"
                value={arrayValue.name === "reviews" ? arrayValue.value : ""}
                onChange={updateArrayValue}
              />
              {arrayValue.name === "reviews" && arrayValue.value && (
                <button type="button" onClick={handleChangeForArray}>
                  Add
                </button>
              )}
            </div>
            <div>
              <label>Views</label>
              <CustomInput
                type="text"
                name="views"
                placeholder="Views"
                className="create-input"
                value={arrayValue.name === "views" ? arrayValue.value : ""}
                onChange={updateArrayValue}
              />
              {arrayValue.name === "views" && arrayValue.value && (
                <button type="button" onClick={handleChangeForArray}>
                  Add
                </button>
              )}
            </div>
            <div className="create-filebase">
              <label>Photo</label>
              <FileBase64
                multiple={true}
                onDone={(files: any[]) => {
                  const base64Files: Array<string> = files.map(
                    (file) => file.base64
                  );
                  setArrayValue({ name: "photo", value: base64Files[0] });
                  // setFormData({
                  //   ...formData,
                  //   photo: [...formData.photo, ...base64Files],
                  // });
                }}
              />
              {arrayValue.name === "photo" && arrayValue.value && (
                <button type="button" onClick={handleChangeForArray}>
                  Add
                </button>
              )}
            </div>
            <div>
              <label>FlashSales</label>
              <br />
              <CustomInput
                type="checkbox"
                name="isFlashSales"
                className="create-input-checkbox"
                checked={formData.isFlashSales}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>FlashSales</label>
              <br />
              <CustomInput
                type="checkbox"
                name="isFlashSales"
                className="create-input-checkbox"
                checked={formData.isFlashSales}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>BestSelling</label>
              <br />
              <CustomInput
                type="checkbox"
                name="isBestSelling"
                className="create-input-checkbox"
                checked={formData.isBestSelling}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Explore</label>
              <br />
              <CustomInput
                type="checkbox"
                name="isExplore"
                className="create-input-checkbox"
                checked={formData.isExplore}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>New Arrival</label>
              <br />
              <CustomInput
                type="checkbox"
                name="isNewArrival"
                className="create-input-checkbox"
                checked={formData.isNewArrival}
                onChange={handleChange}
              />
            </div>

            <section>
              <header>Other Sizes Information</header>
              <header className="update-other-size-info">
                <div className="update-other-size-label">
                  <aside>Size</aside>
                  <aside>Price</aside>
                  <aside>Discounted Price</aside>
                  <aside>Instock</aside>
                </div>
                <div className="update-other-size-items xs">
                  <aside>XS</aside>
                  <aside>₦{formData.otherSizeInfo.XS.price}</aside>
                  <aside>₦{formData.otherSizeInfo.XS.price}</aside>
                  <aside>{formData.otherSizeInfo.XS.inStock}</aside>
                </div>
                <div className="update-other-size-items s">
                  <aside>S</aside>
                  <aside>₦{formData.otherSizeInfo.S.price}</aside>
                  <aside>₦{formData.otherSizeInfo.S.price}</aside>
                  <aside>{formData.otherSizeInfo.S.inStock}</aside>
                </div>
                <div className="update-other-size-items m">
                  <aside>M</aside>
                  <aside>₦{formData.otherSizeInfo.M.price}</aside>
                  <aside>₦{formData.otherSizeInfo.M.price}</aside>
                  <aside>{formData.otherSizeInfo.M.inStock}</aside>
                </div>
                <div className="update-other-size-items l">
                  <aside>L</aside>
                  <aside>₦{formData.otherSizeInfo.L.price}</aside>
                  <aside>₦{formData.otherSizeInfo.L.price}</aside>
                  <aside>{formData.otherSizeInfo.L.inStock}</aside>
                </div>
                <div className="update-other-size-items xl">
                  <aside>XL</aside>
                  <aside>₦{formData.otherSizeInfo.XL.price}</aside>
                  <aside>₦{formData.otherSizeInfo.XL.price}</aside>
                  <aside>{formData.otherSizeInfo.XL.inStock}</aside>
                </div>
              </header>

              <header>Update Other Sizes Information</header>

              <div>
                <select
                  className="create-input"
                  value={sizeName}
                  onChange={(e) => setSizeName(e.target.value)}
                >
                  <option value="" disabled>
                    Select Size
                  </option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </div>
              <div>
                <CustomInput
                  type="number"
                  name="price"
                  placeholder="Price"
                  className="create-input"
                  value={sizeInfo.price !== 0 ? sizeInfo.price : ""}
                  onChange={updateSizeInfo}
                />
              </div>
              <div>
                <CustomInput
                  type="number"
                  name="discountedPrice"
                  placeholder="DiscountedPrice"
                  className="create-input"
                  value={
                    sizeInfo.discountedPrice !== 0
                      ? sizeInfo.discountedPrice
                      : ""
                  }
                  onChange={updateSizeInfo}
                />
              </div>
              <div>
                <CustomInput
                  type="number"
                  name="inStock"
                  placeholder="InStock"
                  className="create-input"
                  value={sizeInfo.inStock !== 0 ? sizeInfo.inStock : ""}
                  onChange={updateSizeInfo}
                />
              </div>
              <div>
                <p style={{ color: "#db4444", fontStyle: "italic" }}>
                  {otherSizeWarning}
                </p>
                <button
                  type="button"
                  onClick={handleChangeforotherSizeInfo}
                  className="update-other-btn"
                >
                  Add Size
                </button>
              </div>
            </section>
            <aside>
              <CustomButton
                type="submit"
                text="Update Product"
                className="create-product-btn"
              />
            </aside>
          </form>
        </div>
      </main>
    </Navbar>
  );
};

export default UpdateProduct;
