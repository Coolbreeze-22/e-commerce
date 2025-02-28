import React, { useState } from "react";
import "./Auth.css";
import { phoneCart } from "../../assets/images";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import { Google } from "@mui/icons-material";

const Auth = () => {
  interface formType {
    name?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
  }

  const initialState: formType = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  };

  const [formData, setFormData] = useState<formType>(initialState);
  const [isSignup, setIsSignup] = useState<boolean>(false);
  console.log(formData);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    setFormData(initialState);
  };

  const handleGoogle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setFormData(initialState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev: formType) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="auth-container">
      <section className="auth-image-sec">
        <div>
          <img src={phoneCart} alt="phone image" className="auth-image" />
        </div>
      </section>
      <section className="auth-form-sec">
        <form onSubmit={(event) => handleSubmit(event)} className="auth-form">
          <header>
            {isSignup ? " Create an account" : "Log in to Exclusive"}
          </header>
          <div className="auth-form-details">Enter your details below</div>
          {isSignup && (
            <div>
              <CustomInput
                type="text"
                name="name"
                placeholder="Name"
                className="custom-input auth-input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <CustomInput
              type="email"
              name="email"
              placeholder="Email or Phone Number"
              className="custom-input auth-input"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <CustomInput
              type="password"
              name="password"
              placeholder="Password"
              className="custom-input auth-input"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          {isSignup ? (
            <div className="auth-btn-wrapper1">
              <CustomButton
                type="submit"
                text="Create Account"
                className="custom-btn auth-btn-create"
              />
              <button
                onClick={(event) => handleGoogle(event)}
                className="auth-btn-google"
              >
                <span className="auth-btn-google-icon">
                  <Google />
                </span>
                <span className="auth-btn-google-text">
                  Sign up with Google
                </span>
              </button>
              <p className="auth-form-signup-toggle">
                Already have account?{" "}
                <span onClick={() => setIsSignup((prev) => !prev)}>Log in</span>
              </p>
            </div>
          ) : (
            <div>
              <div className="auth-btn-wrapper2">
                <CustomButton
                  onClick={(event) => handleSubmit(event)}
                  text="Log In"
                  className="custom-btn auth-btn-login"
                />
                <span>Forget Password?</span>
              </div>
              <p className="auth-form-signup-toggle">
                Dont have an account?{" "}
                <span onClick={() => setIsSignup((prev) => !prev)}>
                  Sign Up
                </span>
              </p>
            </div>
          )}
        </form>
      </section>
    </main>
  );
};

export default Auth;
