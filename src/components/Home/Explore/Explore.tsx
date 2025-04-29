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
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { useInView } from "react-intersection-observer";
import { breakPoints } from "../../utils/breakPoints";
import { addItemToCart, addItemToWishlist } from "../../utils/utilityFunctions";
import { FiShoppingCart } from "react-icons/fi";

export const Explore = () => {
  const exploreProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.productReducer.explore
  );
  const { ref } = useInView({
    threshold: 0,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleWishlist = (product: ProductType) => {
    addItemToWishlist({ product, dispatch });
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

  const handleAddToCart = (item: ProductType) => {
    addItemToCart({
      item,
      size: item.size,
      quantity: 1,
      dispatch,
    });
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
              <SlArrowLeft className="explore-slide-icon" />
            </div>
            <div className="explore-button-next">
              <SlArrowRight className="explore-slide-icon" />
            </div>
          </section>
        </header>
      </section>

      <section >
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
          {exploreProducts.map((product, index) => (
            <SwiperSlide key={index} className="explore-swiper-slide">
              <div
                className="explore-swiper-slide-div"
                onClick={() => viewProduct(product)}
              >
                <section className="explore-image-sect">
                  <div
                    className="explore-heart"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWishlist(product);
                    }}
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
                    />
                  </div>
                  <div
                    className="explore-add-to-cart"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    <FiShoppingCart className="explore-add-icon" />
                    <p>Add To Cart</p>
                  </div>
                </section>
                <section>
                  <div>
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
