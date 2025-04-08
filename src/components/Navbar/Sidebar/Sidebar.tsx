import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  PersonOutlined,
  LocalMallOutlined,
  CancelOutlined,
  StarBorderOutlined,
  LogoutOutlined,
  LoginOutlined,
  Close,
  HomeOutlined,
  ContactPageOutlined,
  InfoOutlined,
  AdminPanelSettingsOutlined,
} from "@mui/icons-material";
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
              <Close />
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
                <AdminPanelSettingsOutlined />
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
              <HomeOutlined />
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
              <PersonOutlined />
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
              <ContactPageOutlined />
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
              <InfoOutlined />
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
              <LocalMallOutlined />
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
              <CancelOutlined />
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
              <StarBorderOutlined />
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
                <LogoutOutlined />
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
                <LoginOutlined />
              </span>
              <span> Login</span>
            </div>
          )}
    </main>
  );
};

export default Sidebar;
