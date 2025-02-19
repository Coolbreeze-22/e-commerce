import React, { useState } from "react";
import "./Navbar.css";
import {Search} from "@mui/icons-material";

interface NavProps {
  children: React.ReactElement;
}

const Navbar = ({ children }: NavProps) => {
  const [searchItems, setSearchItems] = useState<string | number>("");

  return (
    <main className="nav-container">
      <nav className="nav-wrapper">
        <section className="nav-description">
          <div>
            Summer Sale For All suits And Free Express Delivery - OFF 50%!
            <a href="" className="nav-shop-link">
              ShopNow
            </a>
          </div>
          <div className="nav-language">English</div>
        </section>
        <section className="nav-navigation">
          <h2>Exclusive</h2>
          <div>
            <a href="">Home</a>
          </div>
          <div>
            <a href="">Contact</a>
          </div>
          <div>
            <a href="">About</a>
          </div>
          <div>
            <a href="">Sign Up</a>
          </div>
          <div className="nav-search">
            <input
              className="nav-search-field"
              type="text"
              name="search"
              placeholder="What are you looking for?"
              value={searchItems}
              onChange={(e) => setSearchItems(e.target.value)}
            />
            <Search className="nav-search-icon" />
          </div>
        </section>
      </nav>
      <div className="nav-children">{children}</div>
    </main>
  );
};

export default Navbar;
