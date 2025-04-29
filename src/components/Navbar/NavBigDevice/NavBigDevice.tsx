import "./NavBigDevice.css";
import { FaRegHeart } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import Dropdown from "../Dropdown/Dropdown";
import Badge from "@mui/material/Badge";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { useStateContext } from "../../../context/context";
import * as utils from "../navUtils";
import { useNavigate } from "react-router-dom";

const NavBigDevice = () => {
  const useLabelNavigate = utils.useLabelNavigate();
  const useLogout = utils.useLogout();

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { products, wishlist } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const { searchItems, setSearchItems, isDropdown, setIsDropdown } =
    useStateContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    useLogout();
  };

  const handleSearch = () => {
    if (searchItems) {
      navigate({
        pathname: "/search",
        search: `?name=${searchItems}`,
      });
    }
    setSearchItems("");
  };

  return (
    <nav className="nav-big-routes">
      <section className="nav-big-navigation-section">
        <header
          className="nav-big-header"
          onClick={() => useLabelNavigate("home")}
        >
          Shopinu
        </header>
        <div>
          <a href="/">Home</a>
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
        <div className="nav-big-search">
          <input
            className="nav-big-search-field"
            type="search"
            name="search"
            placeholder="What are you looking for?"
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
          />
          <span onClick={handleSearch}>
            <IoSearchOutline className="nav-big-search-icon" />
          </span>
        </div>

        <div className="nav-big-icons-wrapper">
          <Badge badgeContent={wishlist.length} color="error">
            <FaRegHeart
              className="nav-big-icon"
              onClick={() => useLabelNavigate("wishlist")}
            />
          </Badge>
          <Badge badgeContent={products.length} color="error">
            <FiShoppingCart
              className="nav-big-icon"
              onClick={() => useLabelNavigate("cart")}
            />
          </Badge>
          {user.id && (
            <IoPersonOutline
              className="nav-big-person-icon nav-big-icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdown((prev) => !prev);
              }}
            />
          )}
        </div>
      </section>
      {isDropdown ? <Dropdown /> : null}
    </nav>
  );
};

export default NavBigDevice;
