import './Dropdown.css';
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaRegStar } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";
import { IoPersonOutline } from "react-icons/io5";
import { IoBagHandleOutline } from "react-icons/io5";
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
              <IoPersonOutline />
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
              <IoBagHandleOutline />
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
              <ImCancelCircle />
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
              <FaRegStar />
            </span>
            <span> My Reviews</span>
          </div>
          <div onClick={handleLogout}>
            <span>
              <RiLogoutBoxLine />
            </span>
            <span> Logout</span>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dropdown;
