import React from "react";
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
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";

export const Explore = () => {
  const uniqueExploreProducts: Array<ProductType> = useSelector(
    (state: RootState) => state.products.uniqueExplore
  );
  const navigate = useNavigate();

  const handleProduct = () => {
    navigate("./");
  };

  return (
    <main className="explore-container">
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
          spaceBetween={20}
          slidesPerView={4.2}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".explore-button-next",
            prevEl: ".explore-button-prev",
          }}
        >
          {uniqueExploreProducts.map((product, index) => (
            <SwiperSlide key={index} className="explore-swiper-slide">
              <div className="explore-swiper-slide-div">
                <section className="explore-image-sect">
                  <div className="explore-heart">
                    <FaRegHeart className="explore-icon" />
                  </div>
                  <div className="explore-eye">
                    <MdOutlineRemoveRedEye className="explore-icon" />
                  </div>
                  <div>
                    <img
                      src={product.photo}
                      alt="coat"
                      className="explore-image"
                    />
                  </div>
                </section>
                <section>
                  <div>
                    <p className="explore-item-name">{product.name}</p>
                    {product.discountedPrice && (
                      <span className="explore-new-price">
                        ${product.discountedPrice}{" "}
                      </span>
                    )}
                    <span
                      className={
                        product.discountedPrice
                          ? "explore-old-price"
                          : "explore-new-price"
                      }
                    >
                      ${product.price}
                    </span>
                    <div className="explore-star-rating-wrapper">
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                      <span className="explore-rating">(65)</span>
                    </div>
                  </div>

                  <div className="explore-color-wrapper">
                    <span className="explore-clicked-color">
                      <span
                        className="explore-prod-color1"
                        style={{ backgroundColor: "#184A48" }}
                      ></span>
                    </span>
                    <span
                      className="explore-prod-color2"
                      style={{ backgroundColor: "#DB4444" }}
                    ></span>
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
            onClick={handleProduct}
          />
        </div>
      </section>
    </main>
  );
};
export default Explore;
