// import React from "react";
import "./FlashSales.css";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import flashsaleGamePad from "../../../assets/flashsaleGamePad.png";
import flashsaleKeyboard from "../../../assets/flashsaleKeyboard.png";
import flashsaleTv from "../../../assets/flashsaleTv.png";
import flashsaleChair from "../../../assets/flashsaleChair.png";
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

const FlashSales = () => {
  const navigate = useNavigate();

  // const viewProduct = () => {
  //   navigate('./');
  //   };

  const handleProduct = () => {
    navigate('./');
    };

  return (
    <main className="flashSales-container">
      <section className="flash-info">
        <div className="flash-text-wrapper">
          <span className="flash-red"></span>
          <span className="flash-today">Today's</span>
        </div>
        <header className="flash-header">
          <div>Flash Sales</div>
          <time>
            <div>
              <span>Days</span> <div>03</div>
            </div>
            <div className="flash-colon"> : </div>
            <div>
              <span>Hours</span> <div>23</div>
            </div>
            <div className="flash-colon"> : </div>
            <div>
              <span>Minutes</span> <div>19</div>
            </div>
            <div className="flash-colon"> : </div>
            <div>
              <span>Seconds</span> <div>56</div>
            </div>
          </time>
        </header>
      </section>

      <section className="flashSales-carousel">
        <div>
          <section className="flash-image-sect">
            <div className="flash-discount">-40%</div>
            <div className="flash-heart-icon">
              <FaRegHeart />
            </div>
            <div className="flash-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img
                src={flashsaleGamePad}
                alt="gamepad"
                className="flash-image"
              />
            </div>
          </section>
          <section>
            <div>
              <p className="flash-item-name">HAVIT HV-G92 Gamepad</p>
              <p className="flash-new-price">
                $120 <span className="flash-old-price">$160</span>
              </p>
              <div className="flash-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="flash-star-img" />{" "}
                <span className="flash-rating">(88)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="flash-image-sect">
            <div className="flash-discount">-35%</div>
            <div className="flash-heart-icon">
              <FaRegHeart />
            </div>
            <div className="flash-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img
                src={flashsaleKeyboard}
                alt="keyboard"
                className="flash-image"
              />
            </div>
          </section>
          <section>
            <div>
              <p className="flash-item-name">AK-900 Wired Keyboard</p>
              <p className="flash-new-price">
                $960 <span className="flash-old-price">$1160</span>
              </p>
              <div className="flash-star-rating-wrapper">
                <img src={fourStar} alt="star" className="flash-star-img" />{" "}
                <span className="flash-rating">(75)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="flash-image-sect">
            <div className="flash-discount">-30%</div>
            <div className="flash-heart-icon">
              <FaRegHeart />
            </div>
            <div className="flash-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={flashsaleTv} alt="tv" className="flash-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="flash-item-name">IPS LCD Gaming Monitor</p>
              <p className="flash-new-price">
                $370 <span className="flash-old-price">$400</span>
              </p>
              <div className="flash-star-rating-wrapper">
                <img src={fiveStar} alt="star" className="flash-star-img" />{" "}
                <span className="flash-rating">(99)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="flash-image-sect">
            <div className="flash-discount">-25%</div>
            <div className="flash-heart-icon">
              <FaRegHeart />
            </div>
            <div className="flash-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={flashsaleChair} alt="chair" className="flash-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="flash-item-name">S-Series Comfort Chair</p>
              <p className="flash-new-price">
                $375 <span className="flash-old-price">$400</span>
              </p>
              <div className="flash-star-rating-wrapper">
                <img src={fourhalfStar} alt="star" className="flash-star-img" />{" "}
                <span className="flash-rating">(99)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="flash-image-sect">
            <div className="flash-discount">-25%</div>
            <div className="flash-heart-icon">
              <FaRegHeart />
            </div>
            <div className="flash-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img
                src={flashsaleGamePad}
                alt="gamepad"
                className="flash-image"
              />
            </div>
          </section>
          <section>
            <div>
              <p className="flash-item-name">HAVIT HV-G92 Gamepad</p>
              <p className="flash-new-price">
                $120 <span className="flash-old-price">$160</span>
              </p>
              <div className="flash-star-rating-wrapper">
                <img src={zeroStar} alt="star" className="flash-star-img" />{" "}
                <span className="flash-rating">(0)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="flash-image-sect">
            <div className="flash-discount">-25%</div>
            <div className="flash-heart-icon">
              <FaRegHeart />
            </div>
            <div className="flash-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img
                src={flashsaleKeyboard}
                alt="keyboard"
                className="flash-image"
              />
            </div>
          </section>
          <section>
            <div>
              <p className="flash-item-name">AK-900 Wired Keyboard</p>
              <p className="flash-new-price">
                $960 <span className="flash-old-price">$1160</span>
              </p>
              <div className="flash-star-rating-wrapper">
                <img src={oneStar} alt="star" className="flash-star-img" />{" "}
                <span className="flash-rating">(15)</span>
              </div>
            </div>
          </section>
        </div>

        <div>
          <section className="flash-image-sect">
            <div className="flash-discount">-20%</div>
            <div className="flash-heart-icon">
              <FaRegHeart />
            </div>
            <div className="flash-eye-icon">
              <MdOutlineRemoveRedEye />
            </div>
            <div>
              <img src={flashsaleTv} alt="tv" className="flash-image" />
            </div>
          </section>
          <section>
            <div>
              <p className="flash-item-name">IPS LCD Gaming Monitor</p>
              <p className="flash-new-price">
                $370 <span className="flash-old-price">$400</span>
              </p>
              <div className="flash-star-rating-wrapper">
                <img src={twoStar} alt="star" className="flash-star-img" />{" "}
                <span className="flash-rating">(35)</span>
              </div>
            </div>
          </section>
        </div>
      </section>

      <section>
        <div className="flash-btn-wrapper">
          <CustomButton
          text="View All Products"
            className="flash-btn"
            onClick={handleProduct}
          />
        </div>
      </section>
    </main>
  );
};

export default FlashSales;
