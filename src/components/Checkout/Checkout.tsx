import { useState } from "react";
import "./Checkout.css";
import Paystack from "../../config/Paystack/Paystack";
import CustomButton from "../CustomButton/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import indianPay from "../../assets/indianPay.png";
import kashPay from "../../assets/kashPay.png";
import masterCard from "../../assets/masterCard.png";
import visaCard from "../../assets/visaCard.png";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import CheckoutForm from "./CheckoutForm/CheckoutForm";

const Checkout = () => {
  const cart = useSelector((state: RootState) => state.cartReducer);
  const [coupon, setCoupon] = useState<string>("");

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
          <CheckoutForm />
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
