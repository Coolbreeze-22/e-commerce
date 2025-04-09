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
                navigate("/admin");
                setIsSidebar(false);
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
              navigate("/");
              setIsSidebar(false);
            }}
          >
            <span>
              <AiOutlineHome />
            </span>
            <span>Home</span>
          </div>
          <div
            onClick={() => {
              navigate("/account");
              setIsSidebar(false);
            }}
          >
            <span>
              <IoPersonOutline />
            </span>
            <span>Manage My Account</span>
          </div>
          <div
            onClick={() => {
              navigate("/contact");
              setIsSidebar(false);
            }}
          >
            <span>
              <MdOutlineContactPhone />
            </span>
            <span>Contact</span>
          </div>
          <div
            onClick={() => {
              navigate("/about");
              setIsSidebar(false);
            }}
          >
            <span>
              <GoInfo />
            </span>
            <span>About</span>
          </div>
          <div
            onClick={() => {
              navigate("/account");
              setIsSidebar(false);
            }}
          >
            <span>
              <IoBagHandleOutline />
            </span>
            <span>My Order</span>
          </div>
          <div
            onClick={() => {
              navigate("/account");
              setIsSidebar(false);
            }}
          >
            <span>
              <ImCancelCircle />
            </span>
            <span>My Cancellations</span>
          </div>
          <div
            onClick={() => {
              navigate("/account");
              setIsSidebar(false);
            }}
          >
            <span>
              <FaRegStar />
            </span>
            <span>My Reviews</span>
          </div>
          {user.id ? (
            <div
              onClick={() => {
                handleLogout();
                setIsSidebar(false);
              }}
            >
              <span>
                <RiLogoutBoxLine />
              </span>
              <span>Logout</span>
            </div>
          ) : (
            <div
              onClick={() => {
                navigate("/login");
                setIsSidebar(false);
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
