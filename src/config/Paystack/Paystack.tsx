import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import "./Paystack.css";
import { createOrder } from "../../controller/orderController";
import { OrderProps } from "../../states/redux/reducerTypes";
import { useStateContext } from "../../context/context";
import CustomButton from "../../components/CustomButton/CustomButton";
import { useState } from "react";

const Paystack = () => {
  const paystackPublicKey: string = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const { checkoutFormData } = useStateContext();
  const { user } = useSelector((state: RootState) => state.userReducer);
  const cart = useSelector((state: RootState) => state.cartReducer);
  const [isWarning, setIsWarning] = useState<boolean>(false);
  const {
    firstName,
    companyName,
    streetAddress,
    apartment,
    townCity,
    phoneNumber,
    email,
  } = checkoutFormData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fee: number = 200;
  const total = cart.total + fee;
  const totalInKobo = total * 100;

  const config = {
    reference: new Date().getTime().toString(),
    email: user.email,
    amount: totalInKobo, //Amount is in the country's lowest currency.
    publicKey: paystackPublicKey,
  };

  const handleSuccess = (data: Record<string, string>) => {
    if (data.status === "success") {
      const order: OrderProps = {
        id: "",
        firstName,
        companyName,
        streetAddress,
        apartment,
        townCity,
        phoneNumber,
        email,
        transactionId: data.transaction,
        refId: data.reference,
        userId: user.id,
        items: cart.products,
        paymentStatus: data.status,
        subtotal: cart.total,
        deliveryFee: fee,
        total,
        orderStatus: "processing",
        createdAt: new Date().getTime().toString(),
        updatedAt: new Date().getTime().toString(),
      };
      createOrder({ order, dispatch, navigate });
    }
    setIsWarning(false);
  };
  const handleClose = () => {
    // logic
    setIsWarning(false);
  };

  const componentProps = {
    ...config,
    text: "Place Order",
    onSuccess: (data: Record<string, string>) => handleSuccess(data),
    onClose: handleClose,
  };

  const showButton =
    firstName && streetAddress && townCity && phoneNumber && email
      ? true
      : false;

  return (
    <div className="paystack-container">
      {showButton ? (
        <PaystackButton {...componentProps} className="paystack-btn" />
      ) : (
        <div>
          {isWarning && <i>Fill in the required fields*</i>}
          <CustomButton
            type="submit"
            text="Place Order"
            className="decoy-paystack-btn"
            onClick={() => setIsWarning(true)}
          />
        </div>
      )}
    </div>
  );
};
export default Paystack;
