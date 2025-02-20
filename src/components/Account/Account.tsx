import { useState } from "react";
import "./Account.css";

const Account = () => {
  interface AccountType {
    email?: string;
    password?: string;
    name?: string;
    lastname?: string;

    uid?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  const initialState: AccountType = {};

  const [name, setName] = useState<string>("Md Rimel");
  const [formData, setFormData] = useState<AccountType>(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main>
      <div className="account-wrapper">
      <section className="account-path">
        <div>
          Home / <strong>My Account</strong>
        </div>
        <div>
          Welcome! <span className="account-username">{name}</span>
        </div>
      </section>

      <section className="account-account-section">
        <div>
          <div>
            <h1>Manage My Account</h1>
            <div>My Profile</div>
            <div>Address Book</div>
            <div>My Payment Options</div>
          </div>
          <div>
            <h1>My Orders</h1>
            <div>My Returns</div>
            <div>My Cancellations</div>
          </div>
          <div>
            <h1>My Wishlist</h1>
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </label>
            <br />
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
      </div>
    </main>
  );
};

export default Account;
