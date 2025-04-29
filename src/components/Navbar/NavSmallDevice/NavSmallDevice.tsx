import "./NavSmallDevice.css";
import Sidebar from "../Sidebar/Sidebar";
import { MdMenu } from "react-icons/md";
import { useStateContext } from "../../../context/context";
import { FaRegHeart } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import Badge from "@mui/material/Badge";
import Dropdown from "../Dropdown/Dropdown";
import * as utils from "../navUtils";
import { useNavigate } from "react-router-dom";

const NavSmallDevice = () => {
  const useLabelNavigate = utils.useLabelNavigate();
  const useLogout = utils.useLogout();

  const { user } = useSelector((state: RootState) => state.userReducer);
  const { products, wishlist } = useSelector(
    (state: RootState) => state.cartReducer
  );

  const {
    searchItems,
    setSearchItems,
    isSidebar,
    setIsSidebar,
    isDropdown,
    setIsDropdown,
  } = useStateContext();

  const navigate = useNavigate();

  const handleSidebar = () => {
    setIsSidebar((prev) => !prev);
  };

  const handleNavigate = (label: string) => {
    useLabelNavigate(label);
  };

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
    <nav className="nav-small-device">
      <div className="nav-small-events">
        <div onClick={handleSidebar}>
          <MdMenu size={24} />
        </div>
        <div className="nav-small-search">
          <input
            className="nav-small-search-field"
            type="search"
            name="search"
            placeholder="Search?"
            value={searchItems}
            onChange={(e) => setSearchItems(e.target.value)}
          />
          <span onClick={handleSearch}>
            <IoSearchOutline className="nav-small-search-icon" />
          </span>
        </div>
        <div className="nav-small-icons-wrapper">
          <Badge badgeContent={wishlist.length} color="error">
            <FaRegHeart
              size={20}
              className="nav-small-icon"
              onClick={() => handleNavigate("wishlist")}
            />
          </Badge>
          <Badge badgeContent={products.length} color="error">
            <FiShoppingCart
              size={20}
              className="nav-small-icon"
              onClick={() => handleNavigate("cart")}
            />
          </Badge>
          {user.id && (
            <IoPersonOutline
              size={20}
              className="nav-small-person-icon nav-small-icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdown((prev) => !prev);
              }}
            />
          )}
        </div>
      </div>
      {isDropdown ? <Dropdown /> : null}
      {isSidebar && (
        <div className="nav-small-sidebar">
          <Sidebar
            setIsSidebar={setIsSidebar}
            user={user}
            handleSidebar={handleSidebar}
            handleLogout={handleLogout}
          />
        </div>
      )}
    </nav>
  );
};

export default NavSmallDevice;
