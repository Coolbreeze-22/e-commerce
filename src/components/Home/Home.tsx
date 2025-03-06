// import React from 'react'
import "./Home.css";
import homeIphoneImg from "../../assets/homeIphoneImg.png";
import FlashSales from "./FlashSales/FlashSales";
import Categories from "./Categories/Categories";
import { BestSelling } from "./BestSelling/BestSelling";
import Explore from "./Explore/Explore";
import homeJblImg from "../../assets/homeJblImg.png";

const Home = () => {
  return (
    <main className="home-container">
      <section className="home-sect1">
        <div className="home-categories">
          <div>
            Women's Fashion <span className="home-category-arrow">{">"}</span>
          </div>
          <div>
            Men's Fashion <span className="home-category-arrow">{">"}</span>
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

      <section className="home-sect2">
        <FlashSales />
      </section>
      <hr className="home-horizontal" />
      <section className="home-sect3">
        <Categories />
      </section>
      <hr className="home-horizontal" />
      <section className="home-sect4">
        <BestSelling />
      </section>
      <section className="home-sect5">
        <img src={homeJblImg} alt="JblImg" className="home-jbl-img"/>
      </section>
      <section className="home-sect6">
        <Explore />
      </section>
    </main>
  );
};

export default Home;
