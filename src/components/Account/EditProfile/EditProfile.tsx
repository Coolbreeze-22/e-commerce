import React, { useEffect, useState } from "react";
import "./EditProfile.css";
import CustomInput from "../../CustomInput/CustomInput";
import CustomButton from "../../CustomButton/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { updateProfile } from "../../../controller/userController";
import { initialState } from "../../../constants/user";
import { UserProps } from "../../../states/redux/reducerTypes";

const EditProfile = ({
  setIsEdit,
}: {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [userFormData, setUserFormData] = useState<UserProps>({
    ...initialState,
  });
  const [isInput, setIsInput] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      setUserFormData({
        ...user,
      });
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateProfile(userFormData, dispatch);
    setIsInput(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
    setIsInput(true);
  };
  const handleClose = () => {
    setIsEdit(false);
    setIsInput(false);
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
            className="editProf-input-1"
            value={userFormData.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-text">
          <label>Last Name</label>
          <br />
          <CustomInput
            type="text"
            name="lastName"
            value={userFormData.lastName}
            className="editProf-input-1"
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-text">
          <label>Phone Number</label>
          <br />
          <CustomInput
            type="tel"
            name="phoneNumber"
            className="editProf-input-1"
            value={userFormData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-text">
          <label>Address</label>
          <br />
          <CustomInput
            type="text"
            name="address"
            className="editProf-input-1"
            value={userFormData.address}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-text">
          <label>Company Name</label>
          <br />
          <CustomInput
            type="text"
            name="companyName"
            className="editProf-input-2"
            value={userFormData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-text">
          <label>Apartment</label>
          <br />
          <CustomInput
            type="text"
            name="apartment"
            className="editProf-input-2"
            value={userFormData.apartment}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-form-text">
          <label>City</label>
          <br />
          <CustomInput
            type="text"
            name="city"
            className="editProf-input-2"
            value={userFormData.city}
            onChange={handleChange}
          />
        </div>
        <div className="editProf-btn-wrapper">
          <CustomButton
            type="button"
            onClick={handleClose}
            text="Cancel"
            className="editProf-cancel-btn"
          />
          <CustomButton
            type="submit"
            text="Save Changes"
            className={
              isInput ? "editProf-save-btn" : "editProf-save-btn-disabled"
            }
            disabled={!isInput}
          />
        </div>
      </form>
    </main>
  );
};

export default EditProfile;
