import "./BestSelling.css";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { ProductType } from "../../../states/redux/reducerTypes";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import CustomButton from "../../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { watchlist } from "../../../controller/cartController";
import { computeRating } from "../../utils/utilityFunctions";

export const BestSelling = () => {
  const uniqueBestProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.productReducer.uniqueBestSelling
  );

  const { ref } = useInView({ threshold: 0 });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWatchlist = (product: ProductType) => {
    watchlist({ product, dispatch });
  };

  const viewProduct = (product: ProductType) => {
    navigate(`/product-details/${product.id}`);
  };

  const viewAllProducts = () => {
    navigate("/products");
  };
  const checkRating = (rating: Array<string>, label: string) => {
    const returnData = computeRating(rating, label);
    return returnData;
  };

  return (
    <main className="best-container" ref={ref}>
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
          <div key={index}>
            <section className="best-image-sect">
              <div
                className="best-heart"
                onClick={() => handleWatchlist(product)}
              >
                <FaRegHeart className="best-icon" />
              </div>
              <div className="best-eye">
                <MdOutlineRemoveRedEye className="best-icon" />
              </div>
              <div className="best-image-wrapper">
                <img
                  src={product.photo[0]}
                  alt="loading"
                  className="best-image"
                  loading="lazy"
                  onClick={() => viewProduct(product)}
                />
              </div>
            </section>
            <section onClick={() => viewProduct(product)}>
              <p className="best-item-name">{product.name}</p>
              {product.discountedPrice && (
                <span className="best-new-price">
                  ₦{product.discountedPrice}{" "}
                </span>
              )}
              <span
                className={
                  product.discountedPrice ? "best-old-price" : "best-new-price"
                }
              >
                ₦{product.price}
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
            </section>
          </div>
        ))}
      </section>
    </main>
  );
};

export default BestSelling;
