import React from "react";
import "./ProductDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { ProductType } from "../../../states/redux/reducerTypes";
import { Rating } from "@mui/material";
import { FiTruck } from "react-icons/fi";
import { FaArrowsRotate } from "react-icons/fa6";
import { RelatedProducts } from "../RelatedProducts/RelatedProducts";
import { FaRegHeart } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const ProductDetails = () => {
  const { products: allProducts } = useSelector(
    (state: RootState) => state.products
  );
  const [selectedProduct, setSelectedProduct] =
    React.useState<ProductType | null>(null);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [size, setSize] = React.useState<string>("M");
  const [wishList, setWishList] = React.useState<Array<ProductType>>([]);

  const navigate = useNavigate();
  const { id } = useParams();

  const checkRating = (rating: Array<string>) => {
    const sum = rating.reduce((acc, value) => acc + Number(value), 0);
    const result = sum / rating.length;
    const ratingStar = Number(result.toFixed(1));
    return ratingStar;
  };

  React.useEffect(() => {
    const product = allProducts.find((item) => item.id === id);
    if (product) {
      setSelectedProduct(product);
    }
  }, [allProducts, id]);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const handleSelectedColor = (color: string) => {
    const similarProduct = allProducts.find(
      (item) =>
        item.id !== selectedProduct.id &&
        item.name === selectedProduct.name &&
        item.color === color
    );
    if (similarProduct) {
      setSelectedProduct(similarProduct);
      navigate(`/account/product-details/₦{similarProduct.id}`);
    }
  };

  const handleBuy = () => {};
  const addToWishList = (product: ProductType) => {
    setWishList((prev) => [...prev, product]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleSum = (label: string) => {
    if (label === "plus" && quantity < selectedProduct.quantity) {
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else if (
      label === "minus" &&
      quantity > 1 &&
      quantity <= selectedProduct.quantity
    ) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <main className="prod-dtls-container">
      <div className="prod-dtls-routes">
        <span>Account</span>
        <span>/</span>
        <span>{selectedProduct.subCategory}</span>
        <span>/</span>
        <div className="prod-dtls-item-name">{selectedProduct.name}</div>
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
            <img src={selectedProduct?.photo[0]} alt="img" loading="lazy" />
          </div>
        </section>
        <section className="prod-dtls-info-section">
          <header>Havic HV G-92 Gamepad</header>
          <div className="prod-dtls-rate-rev">
            <Rating
              name="read-only"
              value={checkRating(selectedProduct.rating)}
              readOnly
              precision={0.5}
              size="small"
            />
            <span className="prod-dtls-rev">
              ({selectedProduct.reviews.length} Reviews)
            </span>
            <span className="prod-dtls-hyphen">|</span>
            <span className="prod-dtls-stock">In Stock</span>
          </div>
          <div className="prod-dtls-price">₦{selectedProduct.price}</div>
          <div className="prod-dtls-dscrptn">{selectedProduct.description}</div>
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
                onClick={() => handleSelectedColor(itemColor)}
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
                  itemSize === size ? "prod-dtls-defaultSize" : "prod-dtls-size"
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
                  handleSum("minus");
                }}
              />
              <input
                type="number"
                min="1"
                max={selectedProduct.quantity}
                name="quantity"
                placeholder="2"
                className="prod-dtls-input"
                value={Number(quantity)}
                onChange={handleChange}
              />
              <FiPlus
                className="prod-dtls-sum"
                onClick={() => {
                  handleSum("plus");
                }}
              />
            </div>
            <div className="prod-dtls-buy" onClick={handleBuy}>
              Buy Now
            </div>
            <button
              className="prod-dtls-heart"
              onClick={() => addToWishList(selectedProduct)}
            >
              <FaRegHeart className="prod-dtls-heart-icon" />
            </button>
          </div>
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
    </main>
  );
};

export default ProductDetails;
