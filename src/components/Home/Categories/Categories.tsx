// import React from 'react'
import "./Categories.css";
import { IoIosPhonePortrait } from "react-icons/io";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { TiWatch } from "react-icons/ti";
import { FiCamera } from "react-icons/fi";
import { PiHeadphonesThin } from "react-icons/pi";
import { MdOutlineVideogameAsset } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoIosArrowRoundBack } from "react-icons/io";

const Categories = () => {
  return (
    <main className="category-container">
      <section>
        <div className="category-text">
          <span className="category-red"></span>
          <span className="category-categories">Categories</span>
        </div>
        <header className="category-header">
          <div>Browse By Category</div>
          <section className="category-swiper-arrow">
            <div className="category-button-prev">
              <IoIosArrowRoundBack />
            </div>
            <div className="category-button-next">
              <IoIosArrowRoundForward />
            </div>
          </section>
        </header>
      </section>

      <section className="category-swiper">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={6}
          slidesPerGroup={2}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".category-button-next",
            prevEl: ".category-button-prev",
          }}
        >
          <SwiperSlide className="category-swiper-slide">
            <div>
              <IoIosPhonePortrait className="category-icon" />
            </div>
            <p>Phones</p>
          </SwiperSlide>
          <SwiperSlide className="category-swiper-slide">
            <div>
              <HiOutlineDesktopComputer className="category-icon" />
            </div>
            <p>Computers</p>
          </SwiperSlide>
          <SwiperSlide className="category-swiper-slide">
            <div>
              <TiWatch className="category-icon" />
            </div>
            <p>SmartWatch</p>
          </SwiperSlide>
          <SwiperSlide className="category-swiper-slide">
            <div>
              <FiCamera className="category-icon" />
            </div>
            <p>Camera</p>
          </SwiperSlide>
          <SwiperSlide className="category-swiper-slide">
            <div>
              <PiHeadphonesThin className="category-icon" />
            </div>
            <p>HeadPhones</p>
          </SwiperSlide>
          <SwiperSlide className="category-swiper-slide">
            <div>
              <MdOutlineVideogameAsset className="category-icon" />
            </div>
            <p>Gaming</p>
          </SwiperSlide>
          <SwiperSlide className="category-swiper-slide">
            <div>
              <IoIosPhonePortrait className="category-icon" />
            </div>
            <p>Phones</p>
          </SwiperSlide>
          <SwiperSlide className="category-swiper-slide">
            <div>
              <IoIosPhonePortrait className="category-icon" />
            </div>
            <p>Phones</p>
          </SwiperSlide>
          <SwiperSlide className="category-swiper-slide">
            <div>
              <IoIosPhonePortrait className="category-icon" />
            </div>
            <p>Phones</p>
          </SwiperSlide>
          <SwiperSlide className="category-swiper-slide">
            <div>
              <IoIosPhonePortrait className="category-icon" />
            </div>
            <p>Phones</p>
          </SwiperSlide>
        </Swiper>
      </section>
    </main>
  );
};

export default Categories;
