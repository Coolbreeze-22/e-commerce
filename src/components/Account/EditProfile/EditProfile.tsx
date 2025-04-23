import React, { useState } from "react";
import "./EditProfile.css";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../CustomButton/CustomButton";

const EditProfile = ({ children }: {
  children: React.ReactNode;}) => {
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
    <main className="editProf-container">
      <header className="editProf-form-header">Edit Your Profile</header>
      <form onSubmit={(event) => handleSubmit(event)} className="editProf-form">
        <div className="editProf-form-text">
          <label className="editProf-label">First Name</label>
          <br />
          <CustomInput
            autoFocus
            type="text"
            name="firstName"
            placeholder="Md"
            className="editProf-input-1"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-text">
          <label>Last Name</label>
          <br />
          <CustomInput
            type="text"
            name="lastName"
            placeholder="Rimel"
            value={formData.lastName}
            className="editProf-input-1"
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-text">
          <label>Email</label>
          <br />
          <CustomInput
            type="email"
            name="email"
            placeholder="rimel1111@gmail.com"
            className="editProf-input-1"
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
            className="editProf-input-1"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-password">
          <label>Password Changes</label>
          <br />
          <CustomInput
            type="password"
            name="password"
            placeholder="Current Password"
            className="editProf-input-2"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-password">
          <CustomInput
            type="password"
            name="newPassword"
            placeholder="New Password"
            className="editProf-input-2"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-password">
          <CustomInput
            type="password"
            name="comfirmPassword"
            placeholder="Comfirm New Password"
            className="editProf-input-2"
            value={formData.comfirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-btn-wrapper">
          <CustomButton
            onClick={(event) => handleClear(event)}
            text="Cancel"
            className="editProf-cancel-btn"
          />
          <CustomButton
            type="submit"
            text="Save Changes"
            className="editProf-save-btn"
          />
        </div>
      </form>
      <aside className="editProf-child">
      {children}
      </aside>
    </main>
  );
};

export default EditProfile;
