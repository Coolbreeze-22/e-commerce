// import React from 'react'
import "./Home.css";
import homeImage from '../../assets/homeImage.png';

const Home = () => {
  return (
    <main className="home-container">
      <section className="home-sect1">
        <div className="home-categories">
          <div>Women's Fashion <span className="home-category-arrow">{">"}</span></div>
          <div>Men's Fashion <span className="home-category-arrow">{">"}</span></div>
          <div>Electronics</div>
          <div>Home & Lifestyle</div>
          <div>Medicine</div>
          <div>Sports & Outdoor</div>
          <div>Baby's & Toys</div>
          <div>Groceries & Pets</div>
          <div>Health & Beauty</div>
        </div>
        <div className="home-image-wrapper">
          <img src={homeImage} alt="homeImage" className="home-image"/>
        </div>
      </section>
      <section>images here</section>
    </main>
  );
};

export default Home;
