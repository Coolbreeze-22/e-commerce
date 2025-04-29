import "./Dropdown.css";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { IoPersonOutline } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../controller/userController";
import { useDispatch } from "react-redux";
import { useStateContext } from "../../../context/context";

const Dropdown = () => {
  const { setIsDropdown } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    signOut({ navigate, dispatch });
    navigate("/");
    setIsDropdown(false);
  };

  return (
    <main className="dropdown-container">
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
          <p> Logout</p>
        </div>
      </div>
    </main>
  );
};

export default Dropdown;
