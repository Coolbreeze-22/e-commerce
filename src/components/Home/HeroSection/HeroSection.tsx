import "./HeroSection.css";
import heroIphoneImg from "../../../assets/heroIphoneImg.jpg";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { handleCategoryNavigation } from "../../utils/utilityFunctions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { useRef } from "react";
import { FaApple } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

const HeroSection = () => {
  useSelector;
  const { category } = useSelector((state: RootState) => state.productReducer);
  const scrollRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const categoryNavigation = (itemCategory: string, label: string) => {
    handleCategoryNavigation({ itemCategory, label, navigate });
  };

  const handleArrowClick = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 150;
      const left = direction === "left" ? -scrollAmount : scrollAmount;
      scrollRef.current.scrollBy({
        top: 0,
        left,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="hero-container">
      <section className="hero-category-wrapper">
        <div className="hero-icon-wrapper-sm">
          <aside>
            <IoIosArrowBack
              size={25}
              onClick={() => handleArrowClick("left")}
            />
          </aside>
        </div>
        <div ref={scrollRef} className="hero-categories">
          {category.map((category, index) => (
            <div
              key={index}
              onClick={() => categoryNavigation(category, "category")}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="hero-icon-wrapper-sm">
          <aside>
            <IoIosArrowForward
              size={25}
              onClick={() => handleArrowClick("right")}
            />
          </aside>
        </div>
        <div className="hero-icon-wrapper">
          <aside>
            <IoIosArrowForward size={16} />
          </aside>
          <aside>
            <IoIosArrowForward size={16} />
          </aside>
        </div>
      </section>

      <div className="hero-image-wrapper">
        <div>
          <img src={heroIphoneImg} alt="loading" className="hero-iphone-img" />
        </div>
        <section className="hero-image-info">
          <div>
            <FaApple size={24} />
            <aside>iPhone 14 Series</aside>
          </div>
          <p>Up to 10% off Voucher</p>
          <aside onClick={()=> navigate("/products")}><span>Shop Now </span><FaArrowRightLong size={16} style={{verticalAlign:"middle", marginLeft:"10px"}}/></aside>
        </section>
      </div>
    </main>
  );
};

export default HeroSection;
