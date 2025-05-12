import "./Sidebar.css";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { GoInfo } from "react-icons/go";
import { MdOutlineContactPhone } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { IoPersonOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { IoBagHandleOutline } from "react-icons/io5";
import { UserProps } from "../../../states/redux/reducerTypes";
import * as utils from "../navUtils";
import { ClickAwayListener } from "@mui/material";
import { useStateContext } from "../../../context/context";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";

type sidebarPropType = {
  user: UserProps;
  handleLogout: () => void;
};

const Sidebar = ({ user, handleLogout }: sidebarPropType) => {
  const useLabelNavigate = utils.useLabelNavigate();
  const { setIsSidebar } = useStateContext();

  const handleNavigate = (label: string) => {
    useLabelNavigate(label);
    setIsSidebar(false);
  };
  const handleClick = () => {
    setIsSidebar((prev) => !prev);
  };

  const handleClickAway = () => {
    setIsSidebar(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <main className="sidebar-container">
        <header>
          <span onClick={handleClick}>
            <IoMdClose size={24} />
          </span>
          <span className="side-header" onClick={() => handleNavigate("home")}>
            Shopinu
          </span>
        </header>

        {user.isAdmin && (
          <div
            onClick={() => {
              handleNavigate("admin");
            }}
          >
            <span>
              <MdOutlineAdminPanelSettings size={20} />
            </span>
            <span>Admin</span>
          </div>
        )}
        <div
          onClick={() => {
            handleNavigate("home");
          }}
        >
          <span>
            <AiOutlineHome size={20} />
          </span>
          <span>Home</span>
        </div>
        <div
          onClick={() => {
            handleNavigate("contact");
          }}
        >
          <span>
            <MdOutlineContactPhone size={20} />
          </span>
          <span>Contact</span>
        </div>
        <div
          onClick={() => {
            handleNavigate("about");
          }}
        >
          <span>
            <GoInfo size={20} />
          </span>
          <span>About</span>
        </div>
        <div
          onClick={() => {
            handleNavigate("cart");
          }}
        >
          <span>
            <FiShoppingCart size={20} />
          </span>
          <span>Cart</span>
        </div>
        <div
          onClick={() => {
            handleNavigate("wishlist");
          }}
        >
          <span>
            <FaRegHeart size={20} />
          </span>
          <span>Wishlist</span>
        </div>
        {user.id ? (
          <>
            <div
              onClick={() => {
                handleNavigate("account");
              }}
            >
              <span>
                <IoPersonOutline size={20} />
              </span>
              <span>Manage My Account</span>
            </div>
            <div
              onClick={() => {
                handleNavigate("orders");
              }}
            >
              <span>
                <IoBagHandleOutline size={20} />
              </span>
              <span>My Order</span>
            </div>
            <div
              onClick={() => {
                handleNavigate("account");
              }}
            >
              <span>
                <ImCancelCircle size={20} />
              </span>
              <span>My Cancellations</span>
            </div>
            <div
              onClick={() => {
                handleNavigate("account");
              }}
            >
              <span>
                <FaRegStar size={20} />
              </span>
              <span>My Reviews</span>
            </div>
            <div onClick={handleLogout}>
              <span>
                <RiLogoutBoxLine size={20} />
              </span>
              <span>Logout</span>
            </div>
          </>
        ) : (
          <div
            onClick={() => {
              handleNavigate("login");
            }}
          >
            <span>
              <RiLoginBoxLine size={20} />
            </span>
            <span> Login</span>
          </div>
        )}
      </main>
    </ClickAwayListener>
  );
};

export default Sidebar;
