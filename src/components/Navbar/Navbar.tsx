import React, { useState } from "react";
import "./Navbar.css";
import { FaRegHeart } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import { signOut } from "../../controller/userController";
import { useDispatch } from "react-redux";
import Dropdown from "./Dropdown/Dropdown";

interface NavPropType {
  children: React.ReactElement;
}

const Navbar = ({ children }: NavPropType) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [isSidebar, setIsSidebar] = useState<boolean>(false);
  const [searchItems, setSearchItems] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [dropdown, setDropdown] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSidebar = () => {
    setIsSidebar((prev) => !prev);
  };

  const handleLogout = () => {
    navigate("/");
    setDropdown(false);
    signOut(dispatch);
  };
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
          </div>
          <select
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
            {user.isAdmin && (
              <div>
                <a href="/admin">Admin</a>
              </div>
            )}
            {user.id ? (
              <div onClick={handleLogout}>Sign out</div>
            ) : (
              <div>
                <a href="/register">Sign up</a>
              </div>
            )}
            <div className="nav-search">
              <input
                className="nav-search-field"
                type="search"
                name="search"
                placeholder="What are you looking for?"
                value={searchItems}
                onChange={(e) => setSearchItems(e.target.value)}
              />
              <span onClick={handleSearch}>
                <IoSearchOutline className="nav-search-icon" />
              </span>
            </div>
            {user.id && (
              <div className="nav-icons-wrapper">
                <FaRegHeart />
                <span className="nav-icons">
                  <FiShoppingCart />
                </span>
                <span onClick={() => setDropdown(!dropdown)}>
                  <IoPersonOutline className="nav-person-icon" />
                </span>
              </div>
            )}
          </section>
          {dropdown ? <Dropdown setDropdown={setDropdown} /> : null}
        </section>

        <section className="nav-small-device">
          <div className="nav-events">
            <div onClick={handleSidebar}>
              <MdMenu />
            </div>
            <div className="nav-search">
              <input
                className="nav-search-field"
                type="search"
                name="search"
                placeholder="Search?"
                value={searchItems}
                onChange={(e) => setSearchItems(e.target.value)}
              />
              <span onClick={handleSearch}>
                <IoSearchOutline className="nav-search-icon" />
              </span>
            </div>
            {user.id && (
              <div className="nav-icons-wrapper">
                <FaRegHeart />
                <span className="nav-icons">
                  <FiShoppingCart />
                </span>
                <span onClick={() => setDropdown(!dropdown)}>
                  <IoPersonOutline className="nav-person-icon" />
                </span>
              </div>
            )}
          </div>
          {dropdown ? <Dropdown setDropdown={setDropdown} /> : null}
          {isSidebar && (
            <div className="nav-sidebar">
              <Sidebar
                setIsSidebar={setIsSidebar}
                user={user}
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
