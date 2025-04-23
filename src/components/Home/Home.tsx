import "./Home.css";
import FlashSales from "./FlashSales/FlashSales";
import Categories from "./Categories/Categories";
import { BestSelling } from "./BestSelling/BestSelling";
import Explore from "./Explore/Explore";
import homeJblImg from "../../assets/homeJblImg.png";
import Navbar from "../Navbar/Navbar";
import HeroSection from "./HeroSection/HeroSection";
import NewArrival from "./NewArrival/NewArrival";
import { useRef } from "react";
import { FaArrowUp } from "react-icons/fa6";

const Home = () => {
  const topRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
    topRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <Navbar>
      <main className="home-container">
        <div ref={topRef}></div>
        <HeroSection />
        <FlashSales />
        <hr className="home-horizontal" />
        <Categories />
        <hr className="home-horizontal" />
        <BestSelling />
        <section className="home-sect5">
          <img src={homeJblImg} alt="JblImg" className="home-jbl-img" />
        </section>
        <Explore />
        <NewArrival />

        <button className="home-arrow" onClick={scrollToTop}>
          <FaArrowUp className="home-arrow-icon" />
        </button>
      </main>
    </Navbar>
  );
};

export default Home;
