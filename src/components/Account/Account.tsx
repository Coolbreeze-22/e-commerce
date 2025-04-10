import "./Account.css";
import Profile from "./Profile/Profile";
import ManageAccount from "./ManageAccount/ManageAccount";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import Navbar from "../Navbar/Navbar";

const Account = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();

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
            <div className="acct-prof-edit">
              <Profile />
            </div>
          </section>
        </div>
      </main>
    </Navbar>
  );
};

export default Account;
