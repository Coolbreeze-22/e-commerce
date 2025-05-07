import "./Account.css";
import EditProfile from "./EditProfile/EditProfile";
import ManageAccount from "./ManageAccount/ManageAccount";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import Navbar from "../Navbar/Navbar";
import Orders from "./Orders/Orders";
import Profile from "./Profile/Profile";
import { useState } from "react";
import CustomButton from "../CustomButton/CustomButton";
import { deleteMyAccount } from "../../controller/userController";

const Account = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleDeleteMyAccount = () => {
    setIsWarning(false);
    deleteMyAccount(user.id, navigate);
  };

  return (
    <Navbar>
      <main className="acct-container">
        <div className="acct-wrapper">
          <section className="acct-path">
            <div>
              <span className="acct-path-title1" onClick={() => navigate("/")}>
                Home
              </span>
              /<span className="acct-path-title2">My Account</span>
            </div>
            <div>
              Welcome! <span className="acct-username">{user.firstName}</span>
            </div>
          </section>

          <section className="acct-details">
            <div className="acct-manage">
              <ManageAccount />
            </div>
            {isEdit ? (
              <div className="acct-prof-edit">
                <EditProfile setIsEdit={setIsEdit} />
              </div>
            ) : (
              <div className="acct-prof-edit">
                <Profile>
                  <button
                    onClick={() => setIsEdit((prev) => !prev)}
                    className="acct-edit-btn"
                  >
                    Edit Profile
                  </button>
                </Profile>
              </div>
            )}
          </section>
        </div>
        <Orders />
        <div className="acct-del-area">
          {isWarning ? (
            <aside>
              <p>
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <button
                className="acct-del-btn-no"
                onClick={() => setIsWarning(false)}
              >
                No
              </button>
              <button
                className="acct-del-btn-yes"
                onClick={handleDeleteMyAccount}
              >
                Yes
              </button>
            </aside>
          ) : (
            <CustomButton
              text="Delete Account"
              className="acct-del-acct-btn"
              onClick={() => setIsWarning(true)}
            />
          )}
        </div>
      </main>
    </Navbar>
  );
};

export default Account;
