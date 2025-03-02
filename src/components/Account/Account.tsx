import { useState } from "react";
import "./Account.css";
import Profile from "./Profile/Profile";
import ManageAccount from "./ManageAccount/ManageAccount";


const Account = () => {
  const [name, setName] = useState<string>("Coolbreeze");

  return (
    <main className="acct-container">
      <div className="acct-wrapper">
        <section className="acct-path">
          <div>
            <span className="acct-path-title1">Home</span>/
            <span className="acct-path-title2">My Account</span>
          </div>
          <div>
            Welcome! <span className="acct-username">{name}</span>
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
  );
};

export default Account;
