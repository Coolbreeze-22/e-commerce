import React from "react";
import "./AllProducts.css";
import { Rating } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import { ProductType } from "../../states/redux/reducerTypes";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import MyIntersectionObserver from "../utils/IntersectionObserver";
import {
  computeDiscountPercent,
  computeRating,
} from "../utils/utilityFunctions";
import Navbar from "../Navbar/Navbar";

const AllProducts = () => {
  const allProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const imageRefs = React.useRef<HTMLImageElement[]>([]);

  React.useEffect(() => {
    const cleanUp = MyIntersectionObserver(imageRefs);
    return cleanUp;
  }, [allProducts]);

  const navigate = useNavigate();

  const viewProduct = (product: ProductType) => {
    navigate(`/account/product-details/${product.id}`);
  };
  const checkRating = (rating: Array<string>, label: string) => {
    const returnData = computeRating(rating, label);
    return returnData;
  };
  const checkDiscountPercent = (discountedPrice: string, price: string) => {
    const returnData = computeDiscountPercent(discountedPrice, price);
    return returnData;
  };

  return (
    <Navbar>
      <main className="all-container">
        <section className="all-info">
          <div className="all-path">
            <span className="all-path1" onClick={() => navigate("/")}>
              Home
            </span>
            /<span className="all-path2">Products</span>
          </div>
          <header className="all-header">Available Products</header>
        </section>

        <section className="all-grid">
          {allProducts.map((product, index) => (
            <div key={index} onClick={() => viewProduct(product)}>
              <section className="all-image-sect">
                {product.discountedPrice && (
                  <div className="all-discount">
                    {checkDiscountPercent(
                      product.discountedPrice,
                      product.price
                    )}
                    %
                  </div>
                )}
                <div className="all-heart">
                  <FaRegHeart className="all-icon" />
                </div>
                <div className="all-eye">
                  <MdOutlineRemoveRedEye className="all-icon" />
                </div>
                <div className="all-image-wrapper">
                  <img
                    loading="lazy"
                    ref={(element) => {
                      imageRefs.current[index] = element as HTMLImageElement;
                    }}
                    data-src={product.photo[0]}
                    alt="img"
                    className="all-image"
                  />
                </div>
              </section>
              <section>
                <div>
                  <p className="all-item-name">{product.name}</p>
                  {product.discountedPrice && (
                    <span className="all-new-price">
                      ₦{product.discountedPrice}{" "}
                    </span>
                  )}
                  <span
                    className={
                      product.discountedPrice
                        ? "all-old-price"
                        : "all-new-price"
                    }
                  >
                    ₦{product.price}
                  </span>
                  <div className="all-star-rating-wrapper">
                    <Rating
                      name="read-only"
                      value={checkRating(product.rating, "star")}
                      readOnly
                      precision={0.5}
                      size="small"
                    />
                    <span className="all-rating">
                      ({checkRating(product.rating, "percent")})
                    </span>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </section>
      </main>
    </Navbar>
  );
};
export default AllProducts;
