import React from "react";
import "./BestSelling.css";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ProductType } from "../../../states/redux/reducerTypes";
import { Rating } from "@mui/material";
// import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import CustomButton from "../../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

export const BestSelling = () => {
  const uniqueBestProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.products.uniqueBestSelling
  );
  const navigate = useNavigate();

  const viewProduct = (product: ProductType) => {
    navigate(`/account/product-details/${product.id}`);
  };

  const viewAllProducts = () => {
    navigate("/home/products");
  };

  const checkRating = (rating: Array<string>, label: string) => {
    const sum = rating.reduce((acc, value) => acc + Number(value), 0);
    const result = sum / rating.length;

    const ratingStar = Number(result.toFixed(1));
    const ratingPercent = Math.round(result * 20);
    if (label === "percent") {
      return ratingPercent;
    } else {
      return ratingStar;
    }
  };

  return (
    <main className="best-container">
      <section className="best-info">
        <div className="best-text">
          <span className="best-red"></span>
          <span className="best-month">This Month</span>
        </div>
        <header className="best-header">
          <div>Best Selling Products</div>
          <div className="best-btn-wrapper">
            <CustomButton
              text="View All Products"
              className="best-btn"
              onClick={viewAllProducts}
            />
          </div>
        </header>
      </section>

      <section className="best-carousel">
        {uniqueBestProducts.map((product, index) => (
          <div key={index} onClick={() => viewProduct(product)}>
            <section className="best-image-sect">
              <div className="best-heart">
                <FaRegHeart className="best-icon" />
              </div>
              <div className="best-eye">
                <MdOutlineRemoveRedEye className="best-icon" />
              </div>
              <div>
                <img src={product.photo[0]} alt="coat" className="best-image" />
              </div>
            </section>
            <section>
              <div>
                <p className="best-item-name">{product.name}</p>
                {product.discountedPrice && (
                  <span className="best-new-price">
                    ${product.discountedPrice}{" "}
                  </span>
                )}
                <span
                  className={
                    product.discountedPrice
                      ? "best-old-price"
                      : "best-new-price"
                  }
                >
                  ${product.price}
                </span>
                <div className="best-star-rating-wrapper">
                  <Rating
                    name="read-only"
                    value={checkRating(product.rating, "star")}
                    readOnly
                    precision={0.5}
                    size="small"
                  />
                  <span className="best-rating">
                    ({checkRating(product.rating, "percent")})
                  </span>
                </div>
              </div>
            </section>
          </div>
        ))}
      </section>
    </main>
  );
};

export default BestSelling;
