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
  Menu,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "../Footer/Footer";

interface NavPropType {
  children: React.ReactElement;
}

const Navbar = ({ children }: NavPropType) => {
  const [user, setUser] = useState<boolean>(false);
  const [admin, setAdmin] = useState<boolean>(false);
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSidebar = () => {
    setIsSidebar((prev) => !prev);
  };

  const handleLogout = () => {};
  const handleLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  const handleSearch = () => {
    setSearchItems("");
  };

  return (
    <main>
      <nav className="nav-container">
        <section className="nav-description">
          <div>
            Summer Sale For All suits And Free Express Delivery - OFF 50%!
            <a href="" className="nav-shop-link">
              ShopNow
            </a>
            <select
              value={language}
              onChange={handleLanguage}
              className="nav-language-sm-device"
            >
              <option value="english">English</option>
              <option value="option2">French</option>
            </select>
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

        <section className="nav-routes">
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
            {admin && (
              <div>
                <a href="/admin">Admin</a>
              </div>
            )}
            {user ? (
              <div>
                <a href="/auth">Sign out</a>
              </div>
            ) : (
              <div>
                <a href="/auth">Sign up</a>
              </div>
            )}
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
              {user && (
                <span onClick={() => setDropdown(!dropdown)}>
                  <PersonOutlined className="nav-person-icon" />
                </span>
              )}
            </div>
          </section>
          {dropdown ? (
            <section className="nav-dropdown">
              <div className="nav-dropdown-wrapper">
                <div
                  onClick={() => {
                    navigate("/account");
                    setDropdown(false);
                  }}
                >
                  <span>
                    <PersonOutlined />
                  </span>
                  <span>Manage My Account</span>
                </div>
                <div
                  onClick={() => {
                    navigate("/account");
                    setDropdown(false);
                  }}
                >
                  <span>
                    <LocalMallOutlined />
                  </span>
                  <span> My Order</span>
                </div>
                <div
                  onClick={() => {
                    navigate("/account");
                    setDropdown(false);
                  }}
                >
                  <span>
                    <CancelOutlined />
                  </span>
                  <span> My Cancellations</span>
                </div>
                <div
                  onClick={() => {
                    navigate("/account");
                    setDropdown(false);
                  }}
                >
                  <span>
                    <StarBorderOutlined />
                  </span>
                  <span> My Reviews</span>
                </div>
                <div onClick={handleLogout}>
                  <span>
                    <LogoutOutlined />
                  </span>
                  <span> Logout</span>
                </div>
              </div>
            </section>
          ) : null}
        </section>

        <section className="nav-small-device">
          <div className="nav-events">
            <div onClick={handleSidebar}>
              <Menu />
            </div>
            <div className="nav-search">
              <input
                className="nav-search-field"
                type="text"
                name="search"
                placeholder="Search?"
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
              {user && (
                <span onClick={() => setDropdown(!dropdown)}>
                  <PersonOutlined className="nav-person-icon" />
                </span>
              )}
            </div>
          </div>
          {isSidebar && (
            <div className="nav-sidebar">
              <Sidebar
                setIsSidebar={setIsSidebar}
                user={user}
                admin={admin}
                handleSidebar={handleSidebar}
                handleLogout={handleLogout}
              />
            </div>
          )}
        </section>

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
