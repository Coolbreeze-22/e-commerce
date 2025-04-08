import React, { useState } from "react";
import "./Register.css";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../CustomButton/CustomButton";
import authimg from "../../../assets/authimg.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../../Navbar/Navbar";

const Register = () => {
  interface formType {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }

  const initialState: formType = {
    name: "",
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

  const handleGoogle = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setFormData(initialState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev: formType) => ({ ...prev, [name]: value }));
  };

  return (
    <Navbar>
      <main className="register-container">
        <section className="register-image-sec">
          <div>
            <img src={authimg} alt="phone image" className="register-image" />
          </div>
        </section>
        <section className="register-form-sec">
          <form
            onSubmit={(event) => handleSubmit(event)}
            className="register-form"
          >
            <header>Create an account</header>
            <div className="register-form-details">
              Enter your details below
            </div>

            <div>
              <CustomInput
                type="text"
                name="name"
                placeholder="Name"
                className="register-input"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <CustomInput
                type="email"
                name="email"
                placeholder="Email or Phone Number"
                className="register-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <CustomInput
                type="password"
                name="password"
                placeholder="Password"
                className="register-input"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="register-btn-wrapper1">
              <CustomButton
                type="submit"
                text="Create Account"
                className="register-btn"
              />
              <button
                onClick={(event) => handleGoogle(event)}
                className="register-btn-google"
              >
                <span className="register-btn-google-icon">
                  <FcGoogle />
                </span>
                <span className="register-btn-google-text">
                  Sign up with Google
                </span>
              </button>
              <p className="register-form-signup-toggle">
                Already have account?{" "}
                <span onClick={() => navigate("/login")}>Log in</span>
              </p>
            </div>
          </form>
        </section>
      </main>
    </Navbar>
  );
};

export default Register;
