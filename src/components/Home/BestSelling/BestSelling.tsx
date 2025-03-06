import "./BestSelling.css";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import homeCoatImg from "../../../assets/homeCoatImg.png";
import homeBagImg from "../../../assets/homeBagImg.png";
import homeCoolerImg from "../../../assets/homeCoolerImg.png";
import homeShelfImg from "../../../assets/homeShelfImg.png";
import zeroStar from "../../../assets/zeroStar.png";
// import halfStar from "../../../assets/halfStar.png";
import oneStar from "../../../assets/oneStar.png";
import twoStar from "../../../assets/twoStar.png";
// import threeStar from "../../../assets/threeStar.png";
import fourStar from "../../../assets/fourStar.png";
import fourhalfStar from "../../../assets/fourhalfStar.png";
import fiveStar from "../../../assets/fiveStar.png";
// import { useNavigate } from "react-router-dom";

export const BestSelling = () => {
  //   const navigate = useNavigate();

  //   const viewProduct = () => {
  //     navigate("./");
  //   };

  return (
    <main className="best-container">
      <section className="best-info">
        <div className="best-text">
          <span className="best-red"></span>
          <span className="best-month">This Month</span>
        </div>
        <header className="best-header">
          <div>Best Selling Products</div>
        </header>
      </section>

      <section className="best-carousel">
        <div>
          <section className="best-image-sect">
            <div className="best-heart-icon">
              <FaRegHeart />
            </div>
            <div className="best-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeCoatImg} alt="coat" className="best-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="best-item-name">The north coat</p>
              <p className="best-new-price">
                $260 <span className="best-old-price">$360</span>
              </p>
              <div className="best-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="best-star-img" />{" "}
                <span className="best-rating">(65)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="best-image-sect">
            <div className="best-heart-icon">
              <FaRegHeart />
            </div>
            <div className="best-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeBagImg} alt="bag" className="best-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="best-item-name">Gucci duffle bag</p>
              <p className="best-new-price">
                $960 <span className="best-old-price">$1160</span>
              </p>
              <div className="best-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="best-star-img" />{" "}
                <span className="best-rating">(88)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="best-image-sect">
            <div className="best-heart-icon">
              <FaRegHeart />
            </div>
            <div className="best-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeCoolerImg} alt="cooler" className="best-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="best-item-name">RGB liquid CPU Cooler</p>
              <p className="best-new-price">
                $160 <span className="best-old-price">$170</span>
              </p>
              <div className="best-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="best-star-img" />{" "}
                <span className="best-rating">(88)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="best-image-sect">
            <div className="best-heart-icon">
              <FaRegHeart />
            </div>
            <div className="best-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeShelfImg} alt="shelf" className="best-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="best-item-name">Small BookSelf</p>
              <p className="best-new-price">$360</p>
              <div className="best-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="best-star-img" />{" "}
                <span className="best-rating">(88)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="best-image-sect">
            <div className="best-heart-icon">
              <FaRegHeart />
            </div>
            <div className="best-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeShelfImg} alt="shelf" className="best-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="best-item-name">Small BookSelf</p>
              <p className="best-new-price">$360</p>
              <div className="best-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="best-star-img" />{" "}
                <span className="best-rating">(88)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="best-image-sect">
            <div className="best-heart-icon">
              <FaRegHeart />
            </div>
            <div className="best-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeShelfImg} alt="shelf" className="best-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="best-item-name">Small BookSelf</p>
              <p className="best-new-price">$360</p>
              <div className="best-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="best-star-img" />{" "}
                <span className="best-rating">(88)</span>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
};

export default BestSelling;
