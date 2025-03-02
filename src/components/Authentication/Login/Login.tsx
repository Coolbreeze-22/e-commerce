import React, { useState } from "react";
import "./Login.css";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../CustomButton/CustomButton";
import authimg from "../../../assets/authimg.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  interface formType {
    email?: string;
    phoneNumber?: string;
    password?: string;
  }

  const initialState: formType = {
    email: "",
    phoneNumber: "",
    password: "",
  };

  const [formData, setFormData] = useState<formType>(initialState);
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormData(initialState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev: formType) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="login-container">
      <section className="Login-image-sec">
        <div>
          <img src={authimg} alt="phone image" className="login-image" />
        </div>
      </section>
      <section className="login-form-sec">
        <form onSubmit={(event) => handleSubmit(event)} className="login-form">
          <header>Log in to Exclusive</header>
          <div className="login-form-details">Enter your details below</div>

          <div>
            <CustomInput
              type="email"
              name="email"
              placeholder="Email or Phone Number"
              className="login-input"
              value={formData.email}
              onChange={handleChange}
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
            />
          </div>
          <div>
            <div className="login-btn-wrapper">
              <CustomButton
                type="submit"
                text="Log In"
                className="login-btn"
              />
              <div>Forget Password?</div>
            </div>
            <p className="login-form-signup-toggle">
              Dont have an account?{" "}
              <span onClick={() => navigate("/register")}>Sign Up</span>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
