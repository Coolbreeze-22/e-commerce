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
import {
  addItemToCart,
  addItemToWishlist,
  computeDiscountPercent,
  computeRating,
} from "../../utils/utilityFunctions";
import { FiShoppingCart } from "react-icons/fi";
import CustomCountdown from "../CustomCountdown/CustomCountdown";
import HomeLoading from "../HomeLoading/HomeLoading";
import { useGetCountdown } from "../../../controller/countdownController";

const FlashSales = () => {
  const { countdowns } = useSelector(
    (state: RootState) => state.countdownReducer
  );
  const dispatch = useDispatch();
  useGetCountdown(countdowns.length, dispatch);

  const { flashSales: flashProducts, isLoading } = useSelector(
    (state: RootState) => state.productReducer
  );

  const flashCountdown = countdowns.find((item) => item.name === "flashsale");

  const { ref } = useInView({
    threshold: 0,
  });
  const navigate = useNavigate();

  const viewProduct = (product: ProductType) => {
    navigate(`/product-details/${product.id}`);
  };

  const viewAllProducts = () => {
    navigate("/products");
  };
  const handleWishlist = (product: ProductType) => {
    addItemToWishlist({ product, dispatch });
  };
  function checkRating(rating: Array<string>, label: string) {
    const ratingStar = computeRating(rating, label);
    return ratingStar;
  }

  const checkDiscountPercent = (discountedPrice: number, price: number) => {
    const returnData = computeDiscountPercent(discountedPrice, price);
    return returnData;
  };

  const handleAddToCart = (item: ProductType) => {
    addItemToCart({
      item,
      size: item.size,
      quantity: 1,
      dispatch,
    });
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
            {flashCountdown?.startDate && flashCountdown.endDate && (
              <CustomCountdown
                startDate={flashCountdown.startDate}
                endDate={flashCountdown.endDate}
              />
            )}
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
          {isLoading ? (
            <HomeLoading />
          ) : (
            <>
              {flashProducts.map((product, index) => (
                <SwiperSlide key={index} className="flash-swiper-slide">
                  <div
                    className="flash-swiper-slide-div"
                    onClick={() => viewProduct(product)}
                  >
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWishlist(product);
                        }}
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
                        />
                      </div>
                      <div
                        className="flash-add-to-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product);
                        }}
                      >
                        <FiShoppingCart className="flash-add-icon" />
                        <p>Add To Cart</p>
                      </div>
                    </section>

                    <section>
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
            </>
          )}
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
