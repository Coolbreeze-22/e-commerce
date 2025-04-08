import { useState, useEffect } from "react";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import {
  clearCart,
  updateQuantity,
  removeFromCart,
} from "../../controller/cartController";
import CustomButton from "../CustomButton/CustomButton";
import { useNavigate } from "react-router-dom";
import CustomInput from "../CustomInput/CustomInput";
import { UpdateItemProps, ShowQuantityProps, QuantityProps } from "./cartTypes";
import { MdCancel } from "react-icons/md";
import Navbar from "../Navbar/Navbar";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cartReducer);

  const [updateItem, setUpdateItem] = useState<UpdateItemProps>(
    {} as UpdateItemProps
  );
  const [couponCode, setCouponCode] = useState<string>("");
  const [currIndex, setCurrIndex] = useState<number>(-1);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function initialize() {
    setCurrIndex(-1);
    setUpdateItem({} as UpdateItemProps);
    setCouponCode("");
  }

  const handleClearCart = () => {
    clearCart(dispatch);
    initialize();
    navigate(-1);
  };
  const handdleQuantity = (item: QuantityProps) => {
    const { id, size, event, index } = item;
    const { value } = event.target;
    setUpdateItem({
      id,
      size,
      quantity: Number(value),
    });
    setCurrIndex(index);
  };

  const navigateToshop = () => {
    navigate("/products");
  };
  const updateCart = () => {
    updateQuantity(updateItem, dispatch);
    initialize();
  };
  const removeItemFromCart = (id: string, size: string) => {
    removeFromCart({ id, size }, dispatch);
    initialize();
  };
  const applyCoupon = () => {
    // applyCoupon(couponCode, dispatch);
    setCouponCode("");
  };
  const checkout = () => {
    navigate("/products/cart/checkout");
    initialize();
  };

  useEffect(() => {
    if (!cart.products.length) {
      navigate(-1);
    }
  }, [cart]);

  const showQuantity = (item: ShowQuantityProps) => {
    const { itemId, itemSize, itemQuantity } = item;
    const newQuantity =
      updateItem.id === itemId && updateItem.size === itemSize
        ? updateItem.quantity
        : itemQuantity;
    return newQuantity;
  };

  return (
    <Navbar>
      <main className="cart-container">
        <div className="cart-routes">
          <p className="cart-route-1">Home</p>
          <p className="cart-route-slash">/</p>
          <p className="cart-route-2">Cart</p>
        </div>
        <section>
          <header className="cart-headers">
            <div className="cart-headers-product">Product</div>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </header>
          {cart.products.map((item, index) => (
            <div key={index} className="cart-items">
              <div className="cart-image-area">
                <MdCancel
                  onClick={() => removeItemFromCart(item.id, item.size)}
                  className="cart-cancel-icon"
                />
                <img src={item.photo} alt="loading" loading="lazy" />
                <span>{item.name}</span>
              </div>
              <p>₦{item.discountedPrice ? item.discountedPrice : item.price}</p>
              <div className="cart-input-wrapper">
                <input
                  type="number"
                  min={1}
                  max={item.inStock}
                  name="quantity"
                  onKeyDown={(event) => event.preventDefault()}
                  className={
                    index === currIndex ? "cart-dynamic-input" : "none"
                  }
                  value={showQuantity({
                    itemId: item.id,
                    itemSize: item.size,
                    itemQuantity: item.quantity,
                  })}
                  onChange={(event) =>
                    handdleQuantity({
                      id: item.id,
                      size: item.size,
                      event,
                      index,
                    })
                  }
                />
              </div>
              <p>
                ₦
                {item.discountedPrice
                  ? item.discountedPrice * item.quantity
                  : item.price * item.quantity}
              </p>
            </div>
          ))}
          <div className="cart-button-section">
            <CustomButton
              type="button"
              text="Return To Shop"
              onClick={navigateToshop}
              className="cart-return-button"
            />
            <div style={{ display: cart.products.length ? "block" : "none" }}>
              <CustomButton
                type="button"
                text="Clear Cart"
                onClick={handleClearCart}
                className="cart-clear-button"
              />
            </div>
            <div>
              <CustomButton
                disabled={currIndex >= 0 ? false : true}
                type="button"
                text="Update Cart"
                onClick={updateCart}
                className="cart-update-button"
                style={{
                  backgroundColor: currIndex >= 0 ? "" : "#e7e7e7",
                  color: currIndex >= 0 ? "" : "#808080",
                }}
              />
            </div>
          </div>
          <div className="cart-coup-checkout">
            <section className="cart-coupon">
              <CustomInput
                type="text"
                name="couponCode"
                placeholder="Coupon Code"
                className="cart-coupon-input"
                value={couponCode}
                onChange={(event) => setCouponCode(event.target.value)}
              />
              <CustomButton
                type="button"
                text="Apply Coupon"
                onClick={applyCoupon}
                className="cart-coupon-button"
              />
            </section>

            <section className="cart-checkout">
              <p>Cart Total</p>
              <div>
                <p>Subtotal:</p>
                <p>₦{cart.total}</p>
              </div>
              <hr />
              <div>
                <p>Shipping:</p>
                <p>Free</p>
              </div>
              <hr />
              <div className="cart-total">
                <p>Total:</p>
                <p>₦{cart.total}</p>
              </div>
              <aside className="cart-checkout-btn">
                <CustomButton
                  type="button"
                  text="Process to checkout"
                  onClick={checkout}
                  className="cart-checkout-button"
                />
              </aside>
            </section>
          </div>
        </section>
      </main>
    </Navbar>
  );
};

export default Cart;
