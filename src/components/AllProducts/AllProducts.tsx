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

const AllProducts = () => {
  const allProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.products.products
  );

  const imageRefs = React.useRef<HTMLImageElement[]>([]);

  React.useEffect(() => {
    const cleanUp = MyIntersectionObserver(imageRefs);
    return cleanUp
  }, [allProducts]);
  

  const navigate = useNavigate();

  const viewProduct = (product: ProductType) => {
    navigate(`/account/product-details/${product.id}`);
  };

  const checkDiscountPercent = (discountedPrice: string, price: string) => {
    if (!price && !discountedPrice) {
      return 0;
    }
    const discountPercent = Math.ceil(
      (parseFloat(discountedPrice) / parseFloat(price) - 1) * 100
    );
    return discountPercent;
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
    <main className="all-container">
      <section className="all-info">
        <div>
          <span className="all-path1">Home</span>/
          <span className="all-path2">Products</span>
        </div>
        <header className="all-header">Available Products</header>
      </section>

      <section className="all-grid">
        {allProducts.map((product, index) => (
          <div key={index} onClick={() => viewProduct(product)}>
            <section className="all-image-sect">
              {product.discountedPrice && (
                <div className="all-discount">
                  {checkDiscountPercent(product.discountedPrice, product.price)}
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
                <img loading="lazy"
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
                    product.discountedPrice ? "all-old-price" : "all-new-price"
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
                <p>{product.price}</p>
              </div>
            </section>
          </div>
        ))}
      </section>
    </main>
  );
};
export default AllProducts;
