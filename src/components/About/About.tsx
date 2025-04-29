import Navbar from "../Navbar/Navbar";
import "./About.css";
import { useNavigate } from "react-router-dom";
import aboutLadies from "../../assets/aboutLadies.png";
import { CiShop } from "react-icons/ci";
import { TbCurrencyNaira } from "react-icons/tb";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaSackDollar } from "react-icons/fa6";
import Service from "../Service/Service";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import { aboutBreakPoints } from "../utils/breakPoints";
import { owners } from "../../dummy/dummyOwners";
import { FaInstagram } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";
import { FiTwitter } from "react-icons/fi";

const About = () => {
  const navigate = useNavigate();

  return (
    <Navbar>
      <main className="about-container">
        <div className="about-routes">
          <aside className="about-route1" onClick={() => navigate("/")}>
            Home
          </aside>
          <aside className="about-route-slash">/</aside>
          <aside className="about-route2">about</aside>
        </div>

        <div className="about-body">
          <section className="about-info">
            <header>Our Story</header>
            <p>
              Launched in 2025, Shopinu is Africa's premier online shopping
              marketplace with an active presense in Nigeria. Supported by wide
              range of tailored marketing, data and service solutions. Shopinu
              has 10,500 sellers and 300 brands and serves 3 millions customers
              across the region.
            </p>
            <p>
              Shopinu has more than 1 Million products to offer, growing at a
              very fast rate. Shopinu offers a diverse assortment in categories
              ranging from consumer to retailer products.
            </p>
          </section>
          <section className="about-img">
            <img src={aboutLadies} alt="loading" loading="lazy" />
          </section>
        </div>

        <div className="about-icon-section">
          <div>
            <div className="about-shop-icon">
              <aside className="about-icon-aside">
                <CiShop className="about-icon" />
              </aside>
            </div>
            <div className="about-icon-info">
              <div>10.5k</div>
              <div>Active sellers on our site</div>
            </div>
          </div>
          <div>
            <div className="about-naira-icon">
              <aside className="about-icon-aside">
                <TbCurrencyNaira className="about-icon" />
              </aside>
            </div>
            <div className="about-icon-info">
              <div>33k</div>
              <div>Monthly Product Sale</div>
            </div>
          </div>
          <div>
            <div className="about-bag-icon">
              <aside className="about-icon-aside">
                <HiOutlineShoppingBag className="about-icon" />
              </aside>
            </div>
            <div className="about-icon-info">
              <div>45.5k</div>
              <div>Active customers on our site</div>
            </div>
          </div>
          <div>
            <div className="about-money-icon">
              <aside className="about-icon-aside">
                <FaSackDollar className="about-icon" />
              </aside>
            </div>
            <div className="about-icon-info">
              <div>25k</div>
              <div>Annual gross sale on our site</div>
            </div>
          </div>
        </div>

        <div className="about-owners-wrapper">
          <section className="about-swiper-arrow">
            <div className="about-button-prev">
              <SlArrowLeft className="about-slide-icon" />
            </div>
            <div className="about-button-next">
              <SlArrowRight className="about-slide-icon" />
            </div>
          </section>
          <Swiper
            modules={[Pagination, Navigation]}
            slidesPerGroup={1}
            pagination={{ clickable: true }}
            navigation={{
              nextEl: ".about-button-next",
              prevEl: ".about-button-prev",
            }}
            breakpoints={aboutBreakPoints}
          >
            {owners.map((person, index) => (
              <SwiperSlide key={index} className="about-swiper-slide">
                <div className="about-image-wrapper">
                  <img src={person.photo} alt="loading" loading="lazy" />
                </div>
                <div className="about-person-info">
                  <p className="about-person-name">{person.name}</p>
                  <p className="about-person-title">{person.title}</p>
                  <aside className="about-person-icons">
                    <span>
                      <FiTwitter className="about-x-icon"/>
                    </span>
                    <span>
                      <FaInstagram className="about-ig-icon"/>
                    </span>
                    <span>
                      <RiLinkedinLine className="about-in-icon"/>
                    </span>
                  </aside>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Service />
        </div>
      </main>
    </Navbar>
  );
};

export default About;
