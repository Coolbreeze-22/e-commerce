import React from "react";
import { useNavigate } from "react-router-dom";
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

type sidebarPropType = {
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps;
  handleSidebar: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleLogout: () => void;
};

const Sidebar = ({
  setIsSidebar,
  user,
  handleSidebar,
  handleLogout,
}: sidebarPropType) => {
  const navigate = useNavigate();

  const handleNavigate = (label: string) => {
    switch (label) {
      case "admin":
        navigate("/admin");
        setIsSidebar(false);
        break;
      case "home":
        navigate("/");
        setIsSidebar(false);
        break;
      case "account":
        navigate("/account");
        setIsSidebar(false);
        break;
      case "contact":
        navigate("/contact");
        setIsSidebar(false);
        break;
      case "about":
        navigate("/about");
        setIsSidebar(false);
        break;
      case "orders":
        navigate("/account", { state: { to: "orders" } });
        setIsSidebar(false);
        break;
      case "login":
        navigate("/login");
        setIsSidebar(false);
        break;
    }
  };

  return (
    <main className="sidebar-container">
      <header>
        <span onClick={handleSidebar}>
          <IoMdClose />
        </span>
        <span className="side-header">Exclusive</span>
      </header>

      {user.isAdmin && (
        <div
          onClick={() => {
            handleNavigate("admin");
          }}
        >
          <span>
            <MdOutlineAdminPanelSettings />
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
          <AiOutlineHome />
        </span>
        <span>Home</span>
      </div>
      <div
        onClick={() => {
          handleNavigate("contact");
        }}
      >
        <span>
          <MdOutlineContactPhone />
        </span>
        <span>Contact</span>
      </div>
      <div
        onClick={() => {
          handleNavigate("about");
        }}
      >
        <span>
          <GoInfo />
        </span>
        <span>About</span>
      </div>
      {user.id ? (
        <>
          <div
            onClick={() => {
              handleNavigate("account");
            }}
          >
            <span>
              <IoPersonOutline />
            </span>
            <span>Manage My Account</span>
          </div>
          <div
            onClick={() => {
              handleNavigate("orders");
            }}
          >
            <span>
              <IoBagHandleOutline />
            </span>
            <span>My Order</span>
          </div>
          <div
            onClick={() => {
              handleNavigate("account");
            }}
          >
            <span>
              <ImCancelCircle />
            </span>
            <span>My Cancellations</span>
          </div>
          <div
            onClick={() => {
              handleNavigate("account");
            }}
          >
            <span>
              <FaRegStar />
            </span>
            <span>My Reviews</span>
          </div>
          <div onClick={handleLogout}>
            <span>
              <RiLogoutBoxLine />
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
            <RiLoginBoxLine />
          </span>
          <span> Login</span>
        </div>
      )}
    </main>
  );
};

export default Sidebar;
