import "./CheckoutForm.css";
import CustomInput from "../../CustomInput/CustomInput";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useStateContext } from "../../../context/context";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState

 } from "../../../states/redux/store";
const CheckoutForm = () => {
  const { checkoutFormData, setCheckoutFormData } = useStateContext();
  const { user } = useSelector((state: RootState) => state.userReducer);

  useEffect(() => {
  if (user.id) {
    setCheckoutFormData({
      firstName: user.firstName,
      companyName: user.companyName,
      streetAddress: user.address,
      apartment: user.apartment,
      townCity: user.city,
      phoneNumber: user.phoneNumber,
      email: user.email,
    });
  }
}, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // edditProfile(formData, dispatch)
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCheckoutFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      id="myForm"
      onSubmit={(event) => handleSubmit(event)}
      className="checkout-form"
    >
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
          value={checkoutFormData.firstName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Company Name</label>
        <br />
        <CustomInput
          required
          type="text"
          name="companyName"
          value={checkoutFormData.companyName}
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
          name="streetAddress"
          className="checkout-input"
          value={checkoutFormData.streetAddress}
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
          value={checkoutFormData.apartment}
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
          name="townCity"
          className="checkout-input"
          value={checkoutFormData.townCity}
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
          value={checkoutFormData.phoneNumber}
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
          value={checkoutFormData.email}
          onChange={handleChange}
        />
      </div>
      <aside className="checkout-aside">
        <button type="submit">
          <IoCheckmarkCircle className="checkout-mark-icon" />
        </button>
        <p>Save this information for faster check-out next time</p>
      </aside>
    </form>
  );
};

export default CheckoutForm;
