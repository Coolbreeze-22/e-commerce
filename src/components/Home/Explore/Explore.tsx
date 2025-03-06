import "./Explore.css";
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
import CustomButton from "../../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";

export const Explore = () => {
  const navigate = useNavigate();

  //   const viewProduct = () => {
  //     navigate("./");
  //   };

  const handleProduct = () => {
    navigate("./");
  };

  return (
    <main className="explore-container">
      <section className="explore-info">
        <div className="explore-text">
          <span className="explore-red"></span>
          <span className="explore-product">Our Products</span>
        </div>
        <header className="explore-header">
          <div>Explore Our Products</div>
        </header>
      </section>

      <section className="explore-grid">
        <div className="explore-grid1">
          <section className="explore-image-sect">
            <div className="explore-heart-icon">
              <FaRegHeart />
            </div>
            <div className="explore-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeCoatImg} alt="coat" className="explore-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="explore-item-name">The north coat</p>
              <p className="explore-new-price">
                $260 <span className="explore-old-price">$360</span>
              </p>
              <div className="explore-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="explore-star-img" />{" "}
                <span className="explore-rating">(65)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="explore-image-sect">
            <div className="explore-heart-icon">
              <FaRegHeart />
            </div>
            <div className="explore-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeBagImg} alt="bag" className="explore-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="explore-item-name">Gucci duffle bag</p>
              <p className="explore-new-price">
                $960 <span className="explore-old-price">$1160</span>
              </p>
              <div className="explore-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="explore-star-img" />{" "}
                <span className="explore-rating">(88)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="explore-image-sect">
            <div className="explore-heart-icon">
              <FaRegHeart />
            </div>
            <div className="explore-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeCoolerImg} alt="cooler" className="explore-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="explore-item-name">RGB liquid CPU Cooler</p>
              <p className="explore-new-price">
                $160 <span className="explore-old-price">$170</span>
              </p>
              <div className="explore-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="explore-star-img" />{" "}
                <span className="explore-rating">(88)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="explore-image-sect">
            <div className="explore-heart-icon">
              <FaRegHeart />
            </div>
            <div className="explore-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeShelfImg} alt="shelf" className="explore-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="explore-item-name">Small BookSelf</p>
              <p className="explore-new-price">$360</p>
              <div className="explore-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="explore-star-img" />{" "}
                <span className="explore-rating">(88)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="explore-image-sect">
            <div className="explore-heart-icon">
              <FaRegHeart />
            </div>
            <div className="explore-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeShelfImg} alt="shelf" className="explore-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="explore-item-name">Small BookSelf</p>
              <p className="explore-new-price">$360</p>
              <div className="explore-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="explore-star-img" />{" "}
                <span className="explore-rating">(88)</span>
              </div>
            </div>
            <div className="explore-color-wrapper">
                <span className="explore-clicked-color">
                  <span
                    className="explore-prod-color1"
                    style={{ backgroundColor: "#FB1314" }}
                  ></span>
                </span>
                <span
                  className="explore-prod-color2"
                  style={{ backgroundColor: "#DB4444" }}
                ></span>
              </div>
          </section>
        </div>

        <div>
          <section className="explore-image-sect">
            <div className="explore-heart-icon">
              <FaRegHeart />
            </div>
            <div className="explore-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeShelfImg} alt="shelf" className="explore-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="explore-item-name">Small BookSelf</p>
              <p className="explore-new-price">$360</p>
              <div className="explore-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="explore-star-img" />{" "}
                <span className="explore-rating">(88)</span>
              </div>
            </div>
            <div className="explore-color-wrapper">
                <span className="explore-clicked-color">
                  <span
                    className="explore-prod-color1"
                    style={{ backgroundColor: "#EEFF61" }}
                  ></span>
                </span>
                <span
                  className="explore-prod-color2"
                  style={{ backgroundColor: "#DB4444" }}
                ></span>
              </div>
          </section>
        </div>

        <div>
          <section className="explore-image-sect">
            <div className="explore-heart-icon">
              <FaRegHeart />
            </div>
            <div className="explore-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeShelfImg} alt="shelf" className="explore-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="explore-item-name">Small BookSelf</p>
              <p className="explore-new-price">$360</p>
              <div className="explore-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="explore-star-img" />{" "}
                <span className="explore-rating">(88)</span>
              </div>
            </div>
            <div className="explore-color-wrapper">
                <span className="explore-clicked-color">
                  <span
                    className="explore-prod-color1"
                    style={{ backgroundColor: "#000000" }}
                  ></span>
                </span>
                <span
                  className="explore-prod-color2"
                  style={{ backgroundColor: "#DB4444" }}
                ></span>
              </div>
          </section>
        </div>

        <div>
          <section className="explore-image-sect">
            <div className="explore-heart-icon">
              <FaRegHeart />
            </div>
            <div className="explore-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={homeShelfImg} alt="shelf" className="explore-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="explore-item-name">Small BookSelf</p>
              <p className="explore-new-price">$360</p>
              <div className="explore-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="explore-star-img" />{" "}
                <span className="explore-rating">(88)</span>
              </div>
              <div className="explore-color-wrapper">
                <span className="explore-clicked-color">
                  <span
                    className="explore-prod-color1"
                    style={{ backgroundColor: "#184A48" }}
                  ></span>
                </span>
                <span
                  className="explore-prod-color2"
                  style={{ backgroundColor: "#DB4444" }}
                ></span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section>
        <div className="explore-btn-wrapper">
          <CustomButton
            text="View All Products"
            className="explore-btn"
            onClick={handleProduct}
          />
        </div>
      </section>
    </main>
  );
};
export default Explore;
