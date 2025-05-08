import { FormEvent, useState } from "react";
import "./ResetPassword.css";
import { resetPassword } from "../../../controller/userController";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../CustomButton/CustomButton";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [warning, setWarning] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      setWarning("Enter  email");
    } else {
      resetPassword({ email, dispatch, navigate });
      setWarning("");
    }
  };

  return (
    <Navbar>
      <main className="reset-container">
        <header>Reset Password</header>
        <form className="reset-form" onSubmit={handleSubmit}>
          <CustomInput
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            className="reset-input"
            onChange={(e) => setEmail(e.target.value)}
          />
          {warning ? (
            <aside style={{ color: "#db4444", fontStyle: "italic" }}>
              {warning}
            </aside>
          ) : null}
          <CustomButton
            type="submit"
            text="Send password reset email"
            className="reset-btn"
          />
        </form>
      </main>
    </Navbar>
  );
};

export default ResetPassword;
