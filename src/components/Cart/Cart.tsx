import { useState } from "react";
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
// import CustomInput from "../CustomInput/CustomInput";
import { UpdateItemProps, ShowQuantityProps, QuantityProps } from "./cartTypes";
import { MdCancel } from "react-icons/md";
import Navbar from "../Navbar/Navbar";
import CartWishlist from "./CartWishlist/CartWishlist";
import { GrUpdate } from "react-icons/gr";
// import { useStateContext } from "../../context/context";

const Cart = () => {
  const cart = useSelector((state: RootState) => state.cartReducer);
  const { user } = useSelector((state: RootState) => state.userReducer);
  // const { couponCode, setCouponCode } = useStateContext();

  const [updateItem, setUpdateItem] = useState<UpdateItemProps>(
    {} as UpdateItemProps
  );
  const [currIndex, setCurrIndex] = useState<number>(-1);
  const [inStockMessage, setInStockMessage] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function initializeStates() {
    setCurrIndex(-1);
    setUpdateItem({} as UpdateItemProps);
    // setCouponCode("");
    setInStockMessage("");
  }

  const handleClearCart = () => {
    clearCart(dispatch);
    initializeStates();
  };
  const handleQuantity = (item: QuantityProps) => {
    const { id, size, event, index, quantity, inStock } = item;
    const { value } = event.target;
    const notInRange = Number(value) > inStock || Number(value) < 1;
    const equal = Number(value) === quantity;
    if (notInRange && inStock !== 1) {
      setInStockMessage(`Select from 1 to ${inStock}`);
    } else if (equal) {
      setInStockMessage(`No changes made`);
    } else if (inStock === 1) {
      setInStockMessage("Select 1");
    } else {
      setInStockMessage("");
    }
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
    if (updateItem.id) {
      updateQuantity(updateItem, dispatch);
      initializeStates();
    }
  };
  const removeItemFromCart = (id: string, size: string) => {
    removeFromCart({ id, size }, dispatch);
    initializeStates();
  };
  // const handleApplyCoupon = () => {
  //   setCouponCode("");
  // };
  const checkout = (label: string) => {
    if (label === "login") {
      navigate("/login");
      return;
    }
    navigate("/products/cart/checkout");
    initializeStates();
  };

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
        {!cart.products.length ? (
          <div className="cart-no-item">
            No item in cart yet!<button>view products</button>
          </div>
        ) : (
          <>
            <div className="cart-routes">
              <p className="cart-route-1">Home</p>
              <p className="cart-route-slash">/</p>
              <p className="cart-route-2">Cart</p>
            </div>
            <section>
              <header className="cart-headers">
                <div className="cart-headers-product">Product</div>
                <p>Price</p>
                <p>In Stock</p>
                <p>Quantity</p>
                <p>Subtotal</p>
              </header>
              <div
                className={
                  cart.products.length ? "cart-clear" : "cart-hide-clear"
                }
              >
                <CustomButton
                  type="button"
                  text="Clear Cart"
                  onClick={handleClearCart}
                  className="cart-clear-button"
                />
              </div>

              {cart.products.map((item, index) => (
                <div key={index} className="cart-items">
                  <div className="cart-image-area">
                    <MdCancel
                      onClick={() => removeItemFromCart(item.id, item.size)}
                      className="cart-cancel-icon"
                    />
                    <img src={item.photo} alt="loading" loading="lazy" />
                    <aside>{item.name}</aside>
                  </div>
                  <p>
                    ₦{item.discountedPrice ? item.discountedPrice : item.price}
                  </p>
                  <p>{item.inStock} Piece(s)</p>
                  <div className="cart-input-wrapper">
                    <input
                      type="number"
                      min={1}
                      max={item.inStock}
                      name="quantity"
                      className={
                        index === currIndex ? "cart-active-input" : "none"
                      }
                      value={showQuantity({
                        itemId: item.id,
                        itemSize: item.size,
                        itemQuantity: item.quantity,
                      })}
                      onChange={(event) =>
                        handleQuantity({
                          id: item.id,
                          size: item.size,
                          event,
                          index,
                          quantity: item.quantity,
                          inStock: item.inStock,
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
                  {currIndex === index && (
                    <aside className="cart-message">{inStockMessage}</aside>
                  )}
                </div>
              ))}
              <CartWishlist />

              <div className="cart-button-section">
                <CustomButton
                  type="button"
                  text="Return To Shop"
                  onClick={navigateToshop}
                  className="cart-return-button"
                />
                <div className="cart-update-lg">
                  <CustomButton
                    disabled={currIndex < 0 || Boolean(inStockMessage)}
                    type="button"
                    text="Update Cart"
                    onClick={updateCart}
                    className="cart-update-button"
                    style={{
                      backgroundColor:
                        currIndex < 0 || inStockMessage ? "#e7e7e7" : "",
                      color: currIndex < 0 || inStockMessage ? "#808080" : "",
                    }}
                  />
                </div>
                <div
                  className="cart-update-sm"
                  style={{
                    color: currIndex < 0 || inStockMessage ? "gray" : "black",
                  }}
                  onClick={
                    currIndex < 0 || inStockMessage ? undefined : updateCart
                  }
                >
                  <GrUpdate size={24} />
                </div>
              </div>
              <div className="cart-coup-checkout">
                {/* <section className="cart-coupon">
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
                    onClick={handleApplyCoupon}
                    className="cart-coupon-button"
                  />
                </section> */}

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
                    {user?.id ? (
                      <CustomButton
                        type="button"
                        text="Process to checkout"
                        onClick={() => checkout("")}
                        className="cart-checkout-button"
                      />
                    ) : (
                      <CustomButton
                        type="button"
                        text="Login to checkout"
                        onClick={() => checkout("login")}
                        className="cart-checkout-button"
                      />
                    )}
                  </aside>
                </section>
              </div>
            </section>
          </>
        )}
      </main>
    </Navbar>
  );
};

export default Cart;
