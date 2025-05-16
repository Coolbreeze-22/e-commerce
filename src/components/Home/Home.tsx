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
import CustomButton from "../CustomButton/CustomButton";
import { useFetchProducts } from "../../controller/productController";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";

const Home = () => {
  const { products } = useSelector((state: RootState) => state.productReducer);
  const dispatch = useDispatch();
  useFetchProducts(products.length, dispatch);

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
        <section className="home-jbl-section">
          <div className="home-jbl">
            <aside>Categories</aside>
            <aside>Enhance Your Music Experience</aside>
            <aside>Count</aside>
            <CustomButton text="Buy Now!" className="home-buy-btn" />
          </div>
          <div className="home-jbl-img">
            <img src={homeJblImg} alt="JblImg" />
          </div>
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
