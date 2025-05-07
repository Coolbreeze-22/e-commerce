import "./Dropdown.css";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { IoPersonOutline } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../context/context";
import * as utils from "../navUtils";
import { ClickAwayListener } from "@mui/material";

const Dropdown = () => {
  const useLogout = utils.useLogout();
  const { setIsDropdown } = useStateContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    useLogout();
    setIsDropdown(false);
  };

  const handleClickAway = () => {
    setIsDropdown(false);
  };

  return (
    <main className="dropdown-container">
      <ClickAwayListener
        onClickAway={handleClickAway}
      >
        <div className="dropdown-wrapper">
          <div
            onClick={() => {
              navigate("/account");
              setIsDropdown(false);
            }}
          >
            <span>
              <IoPersonOutline className="dropIcon" />
            </span>
            <p>Manage My Account</p>
          </div>
          <div
            onClick={() => {
              navigate("/account", { state: { to: "orders" } });
              setIsDropdown(false);
            }}
          >
            <span>
              <IoBagHandleOutline className="dropIcon" />
            </span>
            <p> My Order</p>
          </div>
          <div
            onClick={() => {
              navigate("/account");
              setIsDropdown(false);
            }}
          >
            <span>
              <ImCancelCircle className="dropIcon" />
            </span>
            <p> My Cancellations</p>
          </div>
          <div
            onClick={() => {
              navigate("/account");
              setIsDropdown(false);
            }}
          >
            <span>
              <FaRegStar className="dropIcon" />
            </span>
            <p> My Reviews</p>
          </div>
          <div onClick={handleLogout}>
            <span>
              <RiLogoutBoxLine className="dropIcon" />
            </span>
            <p>Logout</p>
          </div>
        </div>
      </ClickAwayListener>
    </main>
  );
};

export default Dropdown;
