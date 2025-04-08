import "./FlashSales.css";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../states/redux/reducerTypes";
import { Rating } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomButton from "../../CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { useInView } from "react-intersection-observer";
import { breakPoints } from "../../utils/breakPoints";
import { watchlist } from "../../../controller/cartController";
import {
  computeDiscountPercent,
  computeRating,
} from "../../utils/utilityFunctions";

const FlashSales = () => {
  const uniqueFlashProducts = useSelector(
    (state: RootState) => state.productReducer.uniqueFlashSales
  );

  const { ref } = useInView({
    threshold: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const viewProduct = (product: ProductType) => {
    navigate(`/product-details/${product.id}`);
  };

  const viewAllProducts = () => {
    navigate("/products");
  };
  const handleWatchlist = (product: ProductType) => {
    watchlist({ product, dispatch });
  };
  function checkRating(rating: Array<string>, label: string) {
    const ratingStar =   computeRating(rating, label);
    return ratingStar;
  }

  const checkDiscountPercent = (discountedPrice: string, price: string) => {
    const returnData = computeDiscountPercent(discountedPrice, price);
    return returnData;
  };

  return (
    <main className="flashSales-container" ref={ref}>
      <section className="flash-info1">
        <div className="flash-text-wrapper">
          <span className="flash-red"></span>
          <span className="flash-today">Today's</span>
        </div>
        <div className="flash-info2">
          <header className="flash-header">Flash Sales</header>
          <div className="flash-cntdwn-arrow-wrapper">
            <time className="flash-countdown">
              <div>
                <span>Days</span> <div>03</div>
              </div>
              <div className="flash-colon"> : </div>
              <div>
                <span>Hours</span> <div>23</div>
              </div>
              <div className="flash-colon"> : </div>
              <div>
                <span>Minutes</span> <div>19</div>
              </div>
              <div className="flash-colon"> : </div>
              <div>
                <span>Seconds</span> <div>56</div>
              </div>
            </time>
            <section className="flash-swiper-arrow">
              <div className="swiper-button-prev" />
              <div className="swiper-button-next" />
            </section>
          </div>
        </div>
      </section>

      <section className="flashSales-swiper">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={breakPoints}
        >
          {uniqueFlashProducts.map((product, index) => (
            <SwiperSlide key={index} className="flash-swiper-slide">
              <div className="flash-swiper-slide-div">
                <section className="flash-image-sect">
                  {product.discountedPrice && (
                    <div className="flash-discount">
                      {checkDiscountPercent(
                        product.discountedPrice,
                        product?.price
                      )}
                      %
                    </div>
                  )}
                  <div
                    className="flash-heart"
                    onClick={() => handleWatchlist(product)}
                  >
                    <FaRegHeart className="flash-icon" />
                  </div>
                  <div className="flash-eye">
                    <MdOutlineRemoveRedEye className="flash-icon" />
                  </div>
                  <div className="flash-image-wrapper">
                    <img
                      src={product.photo[0]}
                      alt="loading"
                      className="flash-image"
                      onClick={() => viewProduct(product)}
                    />
                  </div>
                </section>
                <section onClick={() => viewProduct(product)}>
                  <p className="flash-item-name">{product.name}</p>
                  {product.discountedPrice && (
                    <span className="flash-new-price">
                      ₦{product.discountedPrice}{" "}
                    </span>
                  )}
                  <span
                    className={
                      product.discountedPrice
                        ? "flash-old-price"
                        : "flash-new-price"
                    }
                  >
                    ₦{product.price}
                  </span>
                  <div className="flash-star-rating-wrapper">
                    <Rating
                      name="read-only"
                      value={checkRating(product.rating, "star")}
                      readOnly
                      precision={0.5}
                      size="small"
                    />
                    <span className="flash-rating">
                      ({checkRating(product.rating, "percent")})
                    </span>
                  </div>
                </section>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <div className="flash-btn-wrapper">
          <CustomButton
            text="View All Products"
            className="flash-btn"
            onClick={viewAllProducts}
          />
        </div>
      </section>
    </main>
  );
};

export default FlashSales;
