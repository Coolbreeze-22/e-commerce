import { useState } from "react";
import "./Account.css";
import { useNavigate } from "react-router-dom";

const Account = () => {
  interface formType {
    firstName?: string;
    lastName?: string;
    email?: string;
    address?: string;
    password?: string;
    newPassword?: string;
    comfirmPassword?: string;
  }

  const initialState: formType = {
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    password: "",
    newPassword: "",
    comfirmPassword: "",
  };

  const [name, setName] = useState<string>("Md Rimel");
  const [formData, setFormData] = useState<formType>(initialState);

  // const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setFormData(initialState);
  };
  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main>
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
          <div className="acct-info">
            <header className="acct-info-header">Manage My Account</header>
            <aside className="acct-profile-link">My Profile</aside>
            <aside>Address Book</aside>
            <aside>My Payment Options</aside>
            <header className="acct-info-header">My Orders</header>
            <aside>My Returns</aside>
            <aside>My Cancellations</aside>
            <header className="acct-info-header">My Wishlist</header>
          </div>
          <div className="acct-edit">
            <header className="acct-form-header">Edit Your Profile</header>
            <form onSubmit={handleSubmit} className="acct-form">
              <div className="acct-input-name">
                <label>
                  First Name
                  <br />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Md"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="acct-input-name">
                <label>
                  Last Name
                  <br />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Rimel"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="acct-input-name">
                <label>
                  Email
                  <br />
                  <input
                    type="email"
                    name="email"
                    placeholder="rimel1111@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="acct-input-name">
                <label>
                  Address
                  <br />
                  <input
                    type="text"
                    name="address"
                    placeholder="Kingston, 5236, United State"
                    value={formData.address}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="acct-input-password">
                <label>
                  Password Changes
                  <br />
                  <input
                    type="password"
                    name="password"
                    placeholder="Current Password"
                    value={formData.password}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="acct-input-password">
                <label>
                  <input
                    type="password"
                    name="newPassword"
                    placeholder="New Password"
                    value={formData.newPassword}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="acct-input-password">
                <label>
                  <input
                    type="password"
                    name="comfirmPassword"
                    placeholder="Comfirm Password"
                    value={formData.comfirmPassword}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </label>
              </div>
              <div className="acct-btn-wrapper">
                <button onClick={handleClear} className="acct-form-cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="acct-form-submit-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Account;
