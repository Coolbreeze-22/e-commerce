import React, { useState } from "react";
import "./Register.css";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../CustomButton/CustomButton";
import authimg from "../../../assets/authimg.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import Navbar from "../../Navbar/Navbar";
import { signUp } from "../../../controller/userController";
import { useDispatch } from "react-redux";

const Register = () => {
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
      signUp({ ...formData, dispatch, navigate });
      setFormData(initialState);
      setWarning("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
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
                type="email"
                name="email"
                placeholder="Email"
                className="register-input"
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
                className="register-input"
                value={formData.password}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </div>

            <div className="register-btn-wrapper1">
              {warning ? (
                <aside style={{ color: "#db4444", fontStyle: "italic" }}>
                  {warning}
                </aside>
              ) : null}
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
                Already have account?
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
