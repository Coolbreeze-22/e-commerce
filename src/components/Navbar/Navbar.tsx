import React, { useState } from "react";
import "./Navbar.css";
import {
  Search,
  FavoriteBorder,
  ShoppingCartOutlined,
  PersonOutlined,
  LocalMallOutlined,
  CancelOutlined,
  StarBorderOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

interface NavChildrenType {
  children: React.ReactElement;
}

const Navbar = ({ children }: NavChildrenType) => {
  const [searchItems, setSearchItems] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [account, setAccount] = useState<boolean>(false);
  const [order, setOrder] = useState<boolean>(false);
  const [cancellations, setCancellations] = useState<boolean>(false);
  const [reviews, setReviews] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);

  const handleSearch = () => {
    setSearchItems("");
  };
  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  function handleDropdown() {
    if (account) {
      setAccount(false);
    } else if (order) {
      setOrder(false);
    } else if (cancellations) {
      setCancellations(false);
    } else if (reviews) {
      setReviews(false);
    } else if (logout) {
      setLogout(false);
    }
  }

  return (
    <nav className="nav-container">
      <section className="nav-description">
        <div>
          Summer Sale For All suits And Free Express Delivery - OFF 50%!
          <a href="" className="nav-shop-link">
            ShopNow
          </a>
        </div>
        <select
          value={language}
          onChange={handleLanguage}
          className="nav-language"
        >
          <option value="english">English</option>
          <option value="option2">French</option>
        </select>
      </section>
      <section className="nav-children-container">
        <section className="nav-navigation-section">
          <header className="nav-header">Exclusive</header>
          <div>
            <a href="/home">Home</a>
          </div>
          <div>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <a href="/about">About</a>
          </div>
          <div>
            <a href="/admin">Admin</a>
          </div>
          <div>
            <a href="/auth">Sign Up</a>
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
            <span onClick={handleSearch}>
              <Search className="nav-search-icon" />
            </span>
          </div>
          <div className="nav-icons-wrapper">
            <FavoriteBorder />
            <span className="nav-icons">
              <ShoppingCartOutlined />
            </span>
            <span onClick={() => setDropdown(!dropdown)}>
              <PersonOutlined className="nav-person-icon" />
            </span>
          </div>
        </section>
        {dropdown ? 
        <section className="nav-dropdown">
          <div className="nav-dropdown-wrapper">
            <div onClick={() => { setAccount(true); handleDropdown()}}>
              <span>
                <PersonOutlined />
              </span>
              <span>Manage My Account</span>
            </div>
            <div onClick={() => {setOrder(true);handleDropdown()}}>
              <span>
                <LocalMallOutlined />
              </span>
              <span> My Order</span>
            </div>
            <div
              onClick={() => {
                setCancellations(true);
                handleDropdown();
              }}
            >
              <span>
                <CancelOutlined />
              </span>
              <span> My Cancellations</span>
            </div>
            <div
              onClick={() => {
                setReviews(true);
                handleDropdown();
              }}
            >
              <span>
                <StarBorderOutlined />
              </span>
              <span> My Reviews</span>
            </div>
            <div
              onClick={() => {
                setLogout(true);
                handleDropdown();
              }}
            >
              <span>
                <LogoutOutlined />
              </span>
              <span> Logout</span>
            </div>
          </div>
        </section>
        : null}
        <hr className="nav-horizontal" />
        <section className="nav-children">{children}</section>
      </section>
    </nav>
  );
};

export default Navbar;
