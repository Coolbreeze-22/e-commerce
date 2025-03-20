import React from "react";
import "./Home.css";
import homeIphoneImg from "../../assets/homeIphoneImg.png";
import FlashSales from "./FlashSales/FlashSales";
import Categories from "./Categories/Categories";
import { BestSelling } from "./BestSelling/BestSelling";
import Explore from "./Explore/Explore";
import homeJblImg from "../../assets/homeJblImg.png";
import { IoIosArrowForward } from "react-icons/io";

const Home = () => {
  return (
    <main className="home-container">
      <section className="home-sect1">
        <div className="home-categories">
          <div>
            Women's Fashion{" "}
            <span className="home-category-arrow">
              <IoIosArrowForward />
            </span>
          </div>
          <div>
            Men's Fashion{" "}
            <span className="home-category-arrow">
              <IoIosArrowForward />
            </span>
          </div>
          <div>Electronics</div>
          <div>Home & Lifestyle</div>
          <div>Medicine</div>
          <div>Sports & Outdoor</div>
          <div>Baby's & Toys</div>
          <div>Groceries & Pets</div>
          <div>Health & Beauty</div>
        </div>
        <div className="home-image-wrapper">
          <img
            src={homeIphoneImg}
            alt="homeIphoneImg"
            className="home-iphone-img"
          />
        </div>
      </section>

      <FlashSales />
      <hr className="home-horizontal" />
      <Categories />
      <hr className="home-horizontal" />
      <BestSelling />
      <section className="home-sect5">
        <img src={homeJblImg} alt="JblImg" className="home-jbl-img" />
      </section>
      <Explore />
    </main>
  );
};

export default Home;
