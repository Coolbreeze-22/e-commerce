import React, { useState } from "react";
import "./Login.css";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../CustomButton/CustomButton";
import authimg from "../../../assets/authimg.png";
import { useNavigate } from "react-router-dom";
import { signIn } from "../../../controller/userController";
import { useDispatch } from "react-redux";
import Navbar from "../../Navbar/Navbar";

const Login = () => {
  interface formType {
    email: string;
    password: string;
  }

  const initialState: formType = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState<formType>(initialState);
  const [warning, setWarning] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.email) {
      setWarning("Enter email");
    } else if (!formData.password) {
      setWarning("Enter password");
    } else {
      signIn({ ...formData, dispatch, navigate });
      setFormData(initialState);
      setWarning("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev: formType) => ({ ...prev, [name]: value }));
  };

  return (
    <Navbar>
      <main className="login-container">
        <section className="Login-image-sec">
          <div>
            <img src={authimg} alt="phone image" className="login-image" />
          </div>
        </section>
        <section className="login-form-sec">
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="login-form"
          >
            <header>Log in to Shopinu</header>
            <div className="login-form-details">Enter your details below</div>

            <div>
              <CustomInput
                type="email"
                name="email"
                placeholder="Email"
                className="login-input"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div>
              <CustomInput
                type="password"
                name="password"
                placeholder="Password"
                className="login-input"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>
            <div>
              <div className="login-btn-wrapper">
                {warning ? (
                  <aside style={{ color: "#db4444", fontStyle: "italic" }}>
                    {warning}
                  </aside>
                ) : null}
                <CustomButton
                  type="submit"
                  text="Log In"
                  className="login-btn"
                />
                <div onClick={() => navigate("/reset-password")}>
                  Forgot Password?
                </div>
              </div>
              <p className="login-form-signup-toggle">
                Dont have an account?
                <span onClick={() => navigate("/register")}>Sign Up</span>
              </p>
            </div>
          </form>
        </section>
      </main>
    </Navbar>
  );
};

export default Login;
