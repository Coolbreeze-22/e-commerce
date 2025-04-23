import "./Account.css";
import EditProfile from "./EditProfile/EditProfile";
import ManageAccount from "./ManageAccount/ManageAccount";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import Navbar from "../Navbar/Navbar";
import Orders from "./Orders/Orders";
import Profile from "./Profile/Profile";
import { useEffect, useState } from "react";

const Account = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.id) {
      navigate('/register');
    }
  }, [user, navigate]);

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
                <EditProfile>
                  <button onClick={() => setIsEdit((prev) => !prev)}>
                    Close
                  </button>
                </EditProfile>
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
      </main>
    </Navbar>
  );
};

export default Account;
