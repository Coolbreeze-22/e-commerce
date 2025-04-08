import React, { useState } from "react";
import "./Profile.css";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../CustomButton/CustomButton";

const Profile = () => {
  interface formType {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    password: string;
    newPassword: string;
    comfirmPassword: string;
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

  const [formData, setFormData] = useState<formType>(initialState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormData(initialState);
  };
  const handleClear = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setFormData(initialState);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev: formType) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="prof-container">
      <header className="prof-form-header">Edit Your Profile</header>
      <form onSubmit={(event) => handleSubmit(event)} className="prof-form">
        <div className="prof-form-text">
          <label className="prof-label">First Name</label>
          <br />
          <CustomInput
            autoFocus
            type="text"
            name="firstName"
            placeholder="Md"
            className="prof-input-1"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="prof-form-text">
          <label>Last Name</label>
          <br />
          <CustomInput
            type="text"
            name="lastName"
            placeholder="Rimel"
            value={formData.lastName}
            className="prof-input-1"
            onChange={handleChange}
          />
        </div>
        <div className="prof-form-text">
          <label>Email</label>
          <br />
          <CustomInput
            type="email"
            name="email"
            placeholder="rimel1111@gmail.com"
            className="prof-input-1"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="prof-form-text">
          <label>Address</label>
          <br />
          <CustomInput
            type="name"
            name="address"
            placeholder="Kingston, 5236, United State"
            className="prof-input-1"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="prof-form-password">
          <label>Password Changes</label>
          <br />
          <CustomInput
            type="password"
            name="password"
            placeholder="Current Password"
            className="prof-input-2"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="prof-form-password">
          <CustomInput
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="prof-input-2"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="prof-form-password">
          <CustomInput
            type="password"
            name="comfirmPassword"
            placeholder="Comfirm New Password"
            className="prof-input-2"
            value={formData.comfirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="prof-btn-wrapper">
          <CustomButton
            onClick={(event) => handleClear(event)}
            text="Cancel"
            className="prof-cancel-btn"
          />
          <CustomButton
            type="submit"
            text="Save Changes"
            className="prof-save-btn"
          />
        </div>
      </form>
    </main>
  );
};

export default Profile;
