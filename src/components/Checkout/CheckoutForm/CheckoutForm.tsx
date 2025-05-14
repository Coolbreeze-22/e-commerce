import "./CheckoutForm.css";
import CustomInput from "../../CustomInput/CustomInput";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { updateProfile } from "../../../controller/userController";
import { UserProps } from "../../../states/redux/reducerTypes";

interface CheckoutFormProps {
  userFormData: UserProps;
  setUserFormData: React.Dispatch<React.SetStateAction<UserProps>>;
}
const CheckoutForm = ({ userFormData, setUserFormData }: CheckoutFormProps) => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [isMarked, setIsMarked] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      setUserFormData({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoUrl,
        address: user.address,
        companyName: user.companyName,
        apartment: user.apartment,
        city: user.city,
        isAdmin: user.isAdmin,
        isOwner: user.isOwner,
        isSignedIn: user.isSignedIn,
        lastLoginAt: user.lastLoginAt,
        lastLogoutAt: user.lastLogoutAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    }
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfile(userFormData, dispatch);
    setIsMarked(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="checkout-form">
      <div>
        <label>
          First Name<span>*</span>
        </label>
        <br />
        <CustomInput
          required
          type="text"
          name="firstName"
          className="checkout-input"
          value={userFormData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Company Name</label>
        <br />
        <CustomInput
          type="text"
          name="companyName"
          value={userFormData.companyName}
          className="checkout-input"
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Street Address<span>*</span>
        </label>
        <br />
        <CustomInput
          required
          type="text"
          name="address"
          className="checkout-input"
          value={userFormData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Apartment, floor, etc. (optional)</label>
        <br />
        <CustomInput
          type="text"
          name="apartment"
          className="checkout-input"
          value={userFormData.apartment}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Town/City<span>*</span>
        </label>
        <br />
        <CustomInput
          required
          type="text"
          name="city"
          className="checkout-input"
          value={userFormData.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Phone Number<span>*</span>
        </label>
        <br />
        <CustomInput
          required
          type="text"
          name="phoneNumber"
          className="checkout-input"
          value={userFormData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>
          Email Address<span>*</span>
        </label>
        <br />
        <CustomInput
          required
          type="email"
          name="email"
          className="checkout-input"
          readOnly={true}
          value={userFormData.email}
          // onChange={handleChange}
        />
      </div>
      <aside className="checkout-aside">
        <button type="submit">
          <IoCheckmarkCircle
            className={
              isMarked ? "checkout-mark-icon" : "checkout-mark-icon-false"
            }
          />
        </button>
        <p>Save this information for faster check-out next time</p>
      </aside>
    </form>
  );
};

export default CheckoutForm;
