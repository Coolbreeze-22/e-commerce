import React, { useState } from "react";
import "./Footer.css";
import { qrCode, playStore, appStore } from "../../assets/images";
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  SendOutlined,
} from "@mui/icons-material";
import CustomInput from "../CustomInput/CustomInput";

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
          <header>Exclusive</header>
          <p className="foot-sect1-sub">Subscribe</p>
          <p className="foot-sect1-get">Get 10% off your first order</p>
          <div className="foot-sect1-email">
            <CustomInput
              type="email"
              name="email"
              placeholder="Enter your email"
              className="foot-search-field"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <div onClick={(event) => handleSubmit(event)}>
              <SendOutlined className="foot-search-icon" />
            </div>
          </div>
        </section>

        <section className="foot-sect2">
          <header>Support</header>
          <p>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
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
              <img src={qrCode} alt="Qr-code" className="foot-img-qrcode" />
            </div>
            <div className="foot-img-btn">
              <div>
                <img
                  src={playStore}
                  alt="Play Store"
                  className="foot-img-playstore"
                />
              </div>
              <div>
                <img
                  src={appStore}
                  alt="App Store"
                  className="foot-img-appstore"
                />
              </div>
            </div>
          </section>
          <section className="foot-sect5-links">
            <span>
              <Facebook />
            </span>
            <span>
              <Twitter />
            </span>
            <span>
              <Instagram />
            </span>
            <span>
              <LinkedIn />
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
