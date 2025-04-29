import React, { useState } from "react";
import "./Footer.css";
import CustomInput from "../CustomInput/CustomInput";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { RiLinkedinLine } from "react-icons/ri";
import { FiTwitter } from "react-icons/fi";
import { AiOutlineSend } from "react-icons/ai";
import footerQrcode from "../../assets/footerQrcode.png";
import footerPlaystore from "../../assets/footerPlaystore.png";
import footerAppstore from "../../assets/footerAppstore.png";

const Footer = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <main className="foot-container">
      <div className="foot-wrapper">
        <section className="foot-sect1">
          <header>Shopinu</header>
          <p className="foot-sect1-sub">Subscribe</p>
          <p className="foot-sect1-get">Get 10% off your first order</p>
          <div className="foot-sect1-email">
            <CustomInput
              type="email"
              name="email"
              placeholder="Enter your email"
              className="foot-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div onClick={(event) => handleSubmit(event)}>
              <AiOutlineSend className="foot-search-icon" />
            </div>
          </div>
        </section>

        <section className="foot-sect2">
          <header>Support</header>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>cooolbreeze123@gmail.com</p>
          <p>+2348005777660</p>
        </section>
        <section className="foot-sect3">
          <header>Account</header>
          <p>My Account</p>
          <p>Login / Register</p>
          <p>Cart</p>
          <p>Wishlist</p>
          <p>Shop</p>
        </section>

        <section className="foot-sect4">
          <header>Quick Link</header>
          <p>Privacy Policy</p>
          <p>Terms Of Use</p>
          <p>FAQ</p>
          <p>Contact</p>
        </section>

        <section className="foot-sect5">
          <header>Download App</header>
          <p>Save $3 with App New User Only</p>
          <section className="foot-img">
            <div>
              <img
                src={footerQrcode}
                alt="Qr-code"
                className="foot-img-qrcode"
              />
            </div>
            <div className="foot-img-btn">
              <div>
                <img
                  src={footerPlaystore}
                  alt="Play Store"
                  className="foot-img-playstore"
                />
              </div>
              <div>
                <img
                  src={footerAppstore}
                  alt="App Store"
                  className="foot-img-appstore"
                />
              </div>
            </div>
          </section>
          <section className="foot-sect5-links">
            <span>
              <FaFacebookF />
            </span>
            <span>
              <FiTwitter />
            </span>
            <span>
              <FaInstagram />
            </span>
            <span>
              <RiLinkedinLine />
            </span>
          </section>
        </section>
      </div>
      <div className="foot-copyright">
        <p>© Copyright Coolbreeze 2022. All right reserved</p>
      </div>
    </main>
  );
};

export default Footer;
