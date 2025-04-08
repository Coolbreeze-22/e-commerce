import React, { useEffect } from "react";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { ProductType } from "../../../states/redux/reducerTypes";
import { Rating } from "@mui/material";
import { FiTruck } from "react-icons/fi";
import { FaArrowsRotate } from "react-icons/fa6";
import { RelatedProducts } from "../RelatedProducts/RelatedProducts";
import { FaRegHeart } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { handleAddToCart, handleSum, handleSelectedColor } from "./prodUtils";
import {
  handleCategoryNavigation,
  computeRating,
} from "../../utils/utilityFunctions";
import { watchlist } from "../../../controller/cartController";
import Navbar from "../../Navbar/Navbar";

const ProductDetails = () => {
  const { products: allProducts } = useSelector(
    (state: RootState) => state.productReducer
  );
  const cart = useSelector((state: RootState) => state.cartReducer);
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductType | null>(null);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [size, setSize] = React.useState<string>("M");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleWatchlist = (product: ProductType) => {
    watchlist({ product, dispatch });
  };

  const categoryNavigation = (itemCategory: string, label: string) => {
    handleCategoryNavigation({ itemCategory, label, navigate });
  };

  function addItemToCart(item: ProductType) {
    handleAddToCart({ item, size, quantity, dispatch });
  }
  function sum(label: string) {
    handleSum({ label, quantity, selectedProduct, setQuantity });
  }
  function selectedColor(color: string) {
    handleSelectedColor({
      color,
      allProducts,
      selectedProduct,
      setSelectedProduct,
    });
  }
  function checkRating(rating: Array<string>, label: string) {
    const returnRatingStar = computeRating(rating, label);
    return returnRatingStar;
  }

  useEffect(() => {
    function findItem() {
      setQuantity(1);
      const product = allProducts.find((item) => item.id === id);
      if (product) {
        setSelectedProduct(product);
      }
    }
    findItem();
  }, [allProducts, id]);

  return (
    <Navbar>
      <main className="prod-dtls-container">
        {!selectedProduct ? (
          <div>No product</div>
        ) : (
          <>
            <div className="prod-dtls-routes">
              <span onClick={() => navigate("/")}>Home</span>
              <span>/</span>
              <span
                onClick={() =>
                  categoryNavigation(selectedProduct.category, "category")
                }
              >
                {selectedProduct.category}
              </span>
              <span>/</span>
              <span
                onClick={() =>
                  categoryNavigation(
                    selectedProduct.subCategory,
                    "sub-category"
                  )
                }
              >
                {selectedProduct.subCategory}
              </span>
              <span>/</span>
              <div>{selectedProduct.name}</div>
            </div>
            <div className="prod-dtls-wrapper">
              <section className="prod-dtls-img-section">
                <div className="prod-dtls-small-img">
                  {selectedProduct?.photo.map((item, index) => (
                    <div key={index}>
                      <img src={item} alt="img" />
                    </div>
                  ))}
                </div>
                <div className="prod-dtls-big-img">
                  <img
                    src={selectedProduct?.photo[0]}
                    alt="img"
                    loading="lazy"
                  />
                </div>
              </section>
              <section className="prod-dtls-info-section">
                <header>Havic HV G-92 Gamepad</header>
                <div className="prod-dtls-rate-rev">
                  <Rating
                    name="read-only"
                    value={checkRating(selectedProduct.rating, "star")}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                  <span className="prod-dtls-rev">
                    ({selectedProduct.reviews.length} Reviews)
                  </span>
                  <span className="prod-dtls-vertical-slash">|</span>
                  <span className="prod-dtls-stock">In Stock</span>
                </div>
                <div className="prod-dtls-price">
                  ₦
                  {selectedProduct.discountedPrice
                    ? selectedProduct.discountedPrice
                    : selectedProduct.price}
                </div>
                <div className="prod-dtls-dscrptn">
                  {selectedProduct.description}
                </div>
                <div className="prod-dtls-color">
                  <div>Colours:</div>
                  {selectedProduct.allColors.map((itemColor, index) => (
                    <span
                      key={index}
                      style={{
                        width: "20px",
                        height: "20px",
                        ...(itemColor === selectedProduct.color && {
                          width: "12px",
                          height: "12px",
                          border: "2px solid black",
                        }),
                      }}
                      onClick={() => selectedColor(itemColor)}
                    >
                      <aside
                        style={{
                          width: "20px",
                          height: "20px",
                          backgroundColor: itemColor,
                          ...(itemColor === selectedProduct.color && {
                            width: "12px",
                            height: "12px",
                          }),
                        }}
                      ></aside>
                    </span>
                  ))}
                </div>
                <div className="prod-dtls-sizes">
                  <div>Size:</div>
                  {selectedProduct.size.map((itemSize, index) => (
                    <button
                      key={index}
                      className={
                        itemSize === size
                          ? "prod-dtls-defaultSize"
                          : "prod-dtls-size"
                      }
                      onClick={() => setSize(itemSize)}
                    >
                      {itemSize}
                    </button>
                  ))}
                </div>
                <div className="prod-dtls-quantity">
                  <div>
                    <FiMinus
                      className="prod-dtls-sum"
                      onClick={() => {
                        sum("decrement");
                      }}
                    />
                    <div className="prod-dtls-sel-quantity">{quantity}</div>
                    <FiPlus
                      className="prod-dtls-sum"
                      onClick={() => {
                        sum("increment");
                      }}
                    />
                  </div>
                  <button
                    className="prod-dtls-buy"
                    onClick={() => addItemToCart(selectedProduct)}
                  >
                    Add To Cart
                  </button>
                  <button
                    className="prod-dtls-heart"
                    onClick={() => handleWatchlist(selectedProduct)}
                  >
                    <FaRegHeart className="prod-dtls-heart-icon" />
                  </button>
                </div>
                {cart.products.length ? (
                  <div className="prod-dtls-view-cart">
                    <button onClick={() => navigate("/cart")}>View Cart</button>
                  </div>
                ) : null}
                <div className="prod-dtls-delivery-wrapper">
                  <div className="prod-dtls-delivery">
                    <FiTruck style={{ fontSize: "25px" }} />
                    <div>
                      <aside className="prod-dtls-free">Free Delivery</aside>
                      <aside className="prod-dtls-postal">
                        Enter your postal code for Delivery Availability
                      </aside>
                    </div>
                  </div>
                  <hr />
                  <div className="prod-dtls-delivery">
                    <FaArrowsRotate style={{ fontSize: "25px" }} />
                    <div>
                      <aside className="prod-dtls-free">Return Delivery</aside>
                      <aside className="prod-dtls-postal">
                        Free 30 Days Delivery Returns. Details
                      </aside>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <RelatedProducts product={selectedProduct} />
          </>
        )}
      </main>
    </Navbar>
  );
};

export default ProductDetails;
