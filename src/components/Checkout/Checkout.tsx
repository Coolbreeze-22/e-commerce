import React, { useState } from "react";
import "./Checkout.css";
import Paystack from "../../config/Paystack/Paystack";
import CustomInput from "../CustomInput/CustomInput";
import CustomButton from "../CustomButton/CustomButton";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import indianPay from "../../assets/indianPay.png";
import kashPay from "../../assets/kashPay.png";
import masterCard from "../../assets/masterCard.png";
import visaCard from "../../assets/visaCard.png";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Checkout = () => {
  interface formType {
    firstName: string;
    companyName: string;
    streetAddress: string;
    apartment: string;
    townCity: string;
    phoneNumber: string;
    email: string;
  }

  const initialState: formType = {
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    email: "",
  };
  const cart = useSelector((state: RootState) => state.cartReducer);
  const [formData, setFormData] = useState<formType>(initialState);
  const [coupon, setCoupon] = useState<string>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormData(initialState);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev: formType) => ({ ...prev, [name]: value }));
  };

  return (
    <Navbar>
      <main className="check-container">
        <div className="check-routes">
          <Link to="/home">Home</Link>
          <span>/</span>
          <a href="/home/account">My Account</a>
          <span>/</span>
          <a href="/home/products">Products</a>
          <span>/</span>
          <a href="/home/cart">Cart</a>
          <span>/</span>
          <div>Checkout</div>
        </div>
        <header>Billing Details</header>

        <div className="checkout-form-cart">
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
                autoFocus
                required
                type="text"
                name="firstName"
                className="checkout-input"
                value={formData.firstName}
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
                value={formData.companyName}
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
                value={formData.streetAddress}
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
                value={formData.apartment}
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
                value={formData.townCity}
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
                value={formData.phoneNumber}
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
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <aside>
              <IoCheckmarkCircle className="checkout-mark-icon" />
              <p>Save this information for faster check-out next time</p>
            </aside>
          </form>

          <section className="checkout-cart-details">
            {cart.products.map((product, index) => (
              <div key={index} className="checkout-cart">
                <div>
                  <img src={product.photo} alt="loading" loading="lazy" />
                  <span>{product.name}</span>
                </div>
                <p>
                  ₦
                  {product.discountedPrice
                    ? product.discountedPrice
                    : product.price}
                </p>
              </div>
            ))}
            <aside className="checkout-cost">
              <div>
                <p>Subtotal:</p>
                <p>₦{cart.total}</p>
              </div>
              <hr className="checkout-hr" />
              <div>
                <p>Shipping:</p>
                <p>Free</p>
              </div>
              <hr className="checkout-hr" />
              <div>
                <p>Total:</p>
                <p>₦{cart.total}</p>
              </div>
            </aside>

            <div className="checkout-bank">
              <div>
                <div>{""}</div>
                <span>Bank</span>
              </div>
              <section>
                <img src={kashPay} alt="An example image" sizes="300px" />
                <img src={visaCard} alt="An example image" />
                <img src={masterCard} alt="An example image" />
                <img src={indianPay} alt="An example image" />
              </section>
            </div>

            <div className="checkout-cash">
              <div>
                <div></div>
              </div>
              <span>Cash on delivery</span>
            </div>

            <div className="checkout-cart-coupon">
              <input
                type="text"
                name="text"
                placeholder="Coupon Code"
                className="checkout-cart-input-coupon"
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
              />
              <div className="checkout-cart-btn-wrapper">
                <CustomButton
                  type="submit"
                  text="Apply Coupon"
                  className="checkout-coupon-btn"
                />
              </div>
            </div>
            <Paystack />
          </section>
        </div>
      </main>
    </Navbar>
  );
};

export default Checkout;
