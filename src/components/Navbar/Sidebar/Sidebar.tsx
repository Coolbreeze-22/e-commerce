import React from "react";
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

type sidebarPropType = {
  setIsSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserProps;
  handleSidebar: () => void;
  handleLogout: () => void;
};

const Sidebar = ({
  setIsSidebar,
  user,
  handleSidebar,
  handleLogout,
}: sidebarPropType) => {
  const useLabelNavigate = utils.useLabelNavigate();

  const handleNavigate = (label: string) => {
    useLabelNavigate(label);
    setIsSidebar(false);
  };

  return (
    <main className="sidebar-container">
      <header>
        <span onClick={handleSidebar}>
          <IoMdClose size={24} />
        </span>
        <span className="side-header" onClick={()=> handleNavigate('home')}>Shopinu</span>
      </header>

      {user.isAdmin && (
        <div
          onClick={() => {
            handleNavigate("admin");
          }}
        >
          <span>
            <MdOutlineAdminPanelSettings size={20}/>
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
          <AiOutlineHome size={20}/>
        </span>
        <span>Home</span>
      </div>
      <div
        onClick={() => {
          handleNavigate("contact");
        }}
      >
        <span>
          <MdOutlineContactPhone size={20}/>
        </span>
        <span>Contact</span>
      </div>
      <div
        onClick={() => {
          handleNavigate("about");
        }}
      >
        <span>
          <GoInfo size={20}/>
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
              <IoPersonOutline size={20}/>
            </span>
            <span>Manage My Account</span>
          </div>
          <div
            onClick={() => {
              handleNavigate("orders");
            }}
          >
            <span>
              <IoBagHandleOutline size={20}/>
            </span>
            <span>My Order</span>
          </div>
          <div
            onClick={() => {
              handleNavigate("account");
            }}
          >
            <span>
              <ImCancelCircle size={20}/>
            </span>
            <span>My Cancellations</span>
          </div>
          <div
            onClick={() => {
              handleNavigate("account");
            }}
          >
            <span>
              <FaRegStar size={20}/>
            </span>
            <span>My Reviews</span>
          </div>
          <div onClick={handleLogout}>
            <span>
              <RiLogoutBoxLine size={20}/>
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
            <RiLoginBoxLine size={20}/>
          </span>
          <span> Login</span>
        </div>
      )}
    </main>
  );
};

export default Sidebar;
