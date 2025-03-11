import React, { useEffect, useState } from "react";
import "./FlashSales.css";
import { useNavigate } from "react-router-dom";
import { products } from "../../../dummy/dummyProducts";
import type { ProductType } from "../../../dummy/dummyProducts";
import { Rating } from "@mui/material";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomButton from "../../CustomButton/CustomButton";

const FlashSales = () => {
  const [storeUniqueProducts, setStoreUniquProduct] = useState<ProductType[]>(
    []
  );
  const navigate = useNavigate();

  const flashProducts = products.filter(
    (product) => product.flashSales === true
  );

  const length = flashProducts.length;

  useEffect(() => {
    const handleFlashSales = () => {
      let uniqueCategories: Set<string> = new Set();
      const uniqueProducts: ProductType[] = [];
      for (let i = 0; i < length; i++) {
        const product = flashProducts[i];
        if (!uniqueCategories.has(product.category)) {
          uniqueCategories.add(product.category);
          uniqueProducts.push(product);
        }
      }
      setStoreUniquProduct(uniqueProducts);
    };

    handleFlashSales();
  }, [length]);

  // const viewProduct = () => {
  //   navigate('./');
  //   };

  const handleProduct = () => {
    navigate("./");
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
  return (
    <main className="flashSales-container">
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
          spaceBetween={20}
          slidesPerView={4.2}
          slidesPerGroup={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
        >
          {storeUniqueProducts.map((product, index) => (
            <SwiperSlide key={index} className="flash-swiper-slide">
              <div className="flash-swiper-slide-div">
                <section className="flash-image-sect">
                  {product.discountedPrice && (
                    <div className="flash-discount">
                      {checkDiscountPercent(
                        product.discountedPrice,
                        product.price
                      )}
                      %
                    </div>
                  )}
                  <div className="flash-heart">
                    <FaRegHeart className="flash-icon" />
                  </div>
                  <div className="flash-eye">
                    <MdOutlineRemoveRedEye className="flash-icon" />
                  </div>
                  <div>
                    <img
                      src={product.photo}
                      alt="gamepad"
                      className="flash-image"
                    />
                  </div>
                </section>
                <section>
                  <div>
                    <p className="flash-item-name">{product.name}</p>
                    {product.discountedPrice && (
                      <span className="flash-new-price">
                        ${product.discountedPrice}{" "}
                      </span>
                    )}
                    <span
                      className={
                        product.discountedPrice
                          ? "flash-old-price"
                          : "flash-new-price"
                      }
                    >
                      ${product.price}
                    </span>
                    <div className="flash-star-rating-wrapper">
                      <Rating
                        name="read-only"
                        value={product.rating}
                        readOnly
                        precision={0.5}
                        size="small"
                      />
                      <span className="flash-rating">(88)</span>
                    </div>
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
            onClick={handleProduct}
          />
        </div>
      </section>
    </main>
  );
};

export default FlashSales;
