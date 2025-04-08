import "./Explore.css";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import CustomButton from "../../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../../../states/redux/reducerTypes";
import { Rating } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { useInView } from "react-intersection-observer";
import { breakPoints } from "../../utils/breakPoints";
import { watchlist } from "../../../controller/cartController";

export const Explore = () => {
  const uniqueExploreProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.productReducer.uniqueExplore
  );
  const { ref } = useInView({
    threshold: 0,
  });
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
    <main className="explore-container" ref={ref}>
      <section className="explore-info">
        <div className="explore-text">
          <span className="explore-red"></span>
          <span className="explore-product">Our Products</span>
        </div>
        <header className="explore-header">
          <div>Explore Our Products</div>
          <section className="explore-swiper-arrow">
            <div className="explore-button-prev">
              <IoIosArrowRoundBack />
            </div>
            <div className="explore-button-next">
              <IoIosArrowRoundForward />
            </div>
          </section>
        </header>
      </section>

      <section className="explore-swiper">
        <Swiper
          modules={[Pagination, Navigation]}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".explore-button-next",
            prevEl: ".explore-button-prev",
          }}
          breakpoints={breakPoints}
        >
          {uniqueExploreProducts.map((product, index) => (
            <SwiperSlide key={index} className="explore-swiper-slide">
              <div className="explore-swiper-slide-div">
                <section className="explore-image-sect">
                  <div
                    className="explore-heart"
                    onClick={() => handleWatchlist(product)}
                  >
                    <FaRegHeart className="explore-icon" />
                  </div>
                  <div className="explore-eye">
                    <MdOutlineRemoveRedEye className="explore-icon" />
                  </div>
                  <div className="explore-image-wrapper">
                    <img
                      src={product.photo[0]}
                      alt="loading"
                      loading="lazy"
                      className="explore-image"
                      onClick={() => viewProduct(product)}
                    />
                  </div>
                </section>
                <section>
                  <div onClick={() => viewProduct(product)}>
                    <p className="explore-item-name">{product.name}</p>
                    {product.discountedPrice && (
                      <span className="explore-new-price">
                        ₦{product.discountedPrice}{" "}
                      </span>
                    )}
                    <span
                      className={
                        product.discountedPrice
                          ? "explore-old-price"
                          : "explore-new-price"
                      }
                    >
                      ₦{product.price}
                    </span>
                    <div className="explore-star-rating-wrapper">
                      <Rating
                        name="read-only"
                        value={checkRating(product.rating, "star")}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                      <span className="explore-rating">
                        ({checkRating(product.rating, "percent")})
                      </span>
                    </div>
                  </div>

                  <div className="explore-color">
                    {product.allColors.map((itemColor, index) => (
                      <span
                        key={index}
                        style={{
                          width: "20px",
                          height: "20px",
                          ...(itemColor === product.color && {
                            width: "12px",
                            height: "12px",
                            border: "2px solid black",
                          }),
                        }}
                      >
                        <aside
                          style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: itemColor,
                            ...(itemColor === product.color && {
                              width: "12px",
                              height: "12px",
                            }),
                          }}
                        ></aside>
                      </span>
                    ))}
                  </div>
                </section>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section>
        <div className="explore-btn-wrapper">
          <CustomButton
            text="View All Products"
            className="explore-btn"
            onClick={viewAllProducts}
          />
        </div>
      </section>
    </main>
  );
};
export default Explore;
