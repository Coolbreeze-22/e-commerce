import './Dropdown.css';
import {
  PersonOutlined,
  LocalMallOutlined,
  CancelOutlined,
  StarBorderOutlined,
  LogoutOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { signOut } from "../../../controller/userController";
import { useDispatch } from "react-redux";

interface DropdownProp {
  setDropdown: Dispatch<SetStateAction<boolean>>;
}

const Dropdown = ({ setDropdown }: DropdownProp) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut(dispatch);
    navigate("/");
    setDropdown(false);
  };

  return (
    <main>
      <section className="dropdown-container">
        <div className="dropdown-wrapper">
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
    </main>
  );
};

export default Dropdown;
