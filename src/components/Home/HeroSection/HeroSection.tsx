import "./HeroSection.css";
import heroIphoneImg from "../../../assets/heroIphoneImg.png";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { handleCategoryNavigation } from "../../utils/utilityFunctions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";

const HeroSection = () => {
  useSelector;
  const { category } = useSelector((state: RootState) => state.productReducer);
  const navigate = useNavigate();

  const categoryNavigation = (itemCategory: string, label: string) => {
    handleCategoryNavigation({ itemCategory, label, navigate });
  };

  return (
    <main className="hero-container">
      <section className="hero-category-wrapper">
        <div className="hero-icon-wrapper hero-icon-wrapper-sm">
          <aside>
            <IoIosArrowBack className="hero-icon" />
          </aside>
        </div>
        <div className="hero-categories">
          {category.map((category, index) => (
            <div
              key={index}
              onClick={() => categoryNavigation(category, "category")}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="hero-icon-wrapper">
          <aside>
            <IoIosArrowForward className="hero-icon" />
          </aside>
          <aside>
            <IoIosArrowForward className="hero-icon" />
          </aside>
        </div>
      </section>

      <div className="hero-image-wrapper">
        <img src={heroIphoneImg} alt="loading" className="hero-iphone-img" />
      </div>
    </main>
  );
};

export default HeroSection;
