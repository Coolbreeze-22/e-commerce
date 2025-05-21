import React from "react";
import "./Navbar.css";
import Footer from "../Footer/Footer";
import NavSmallDevice from "./NavSmallDevice/NavSmallDevice";
import NavBigDevice from "./NavBigDevice/NavBigDevice";
import LanguageSelector from "../LanguageSelector/LanguageSelector";

interface NavPropType {
  children: React.ReactElement;
}

const Navbar = ({ children }: NavPropType) => {
  return (
    <main>
      <nav className="nav-container">
        <section className="nav-description">
          <LanguageSelector />
          <div>
            Free Express Delivery - OFF 50%!
            <a href="/products" className="nav-shop-link">
              ShopNow
            </a>
          </div>
          {/* <select
            value={language}
            onChange={handleLanguage}
            className="nav-language-sm-device"
          >
            <option value="english">English</option>
            <option value="option2">French</option>
          </select>
          <select
            value={language}
            onChange={handleLanguage}
            className="nav-language"
          >
            <option value="english">English</option>
            <option value="option2">French</option>
          </select> */}
        </section>

        <NavBigDevice />
        <NavSmallDevice />
        <hr className="nav-horizontal" />
      </nav>
      <div className="nav-children-container">
        <section className="nav-children">{children}</section>
        <section className="nav-footer">
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default Navbar;
