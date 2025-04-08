import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import { PaystackButton } from "react-paystack";
import { handleOrder } from "./paystackUtils";
import { useNavigate } from "react-router-dom";
import "./Paystack.css";

const Paystack = () => {
  const paystackPublicKey: string = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  const { user } = useSelector((state: RootState) => state.userReducer);
  const cart = useSelector((state: RootState) => state.cartReducer);
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
      const newData = {
        transactionId: data.transaction,
        refId: data.reference,
        userId: user.id,
        items: cart.products,
        paymentStatus: data.status,
        subtotal: cart.total,
        deliveryFee: fee,
        total,
        dispatch,
        navigate
      };
      handleOrder(newData);
    }
  };
  const handleClose = () => {
    // logic
  };

  const componentProps = {
    ...config,
    text: "Place Order",
    onSuccess: (data: Record<string, string>) => handleSuccess(data),
    onClose: handleClose,
  };

  return (
    <div className="paystack-container">
      <PaystackButton {...componentProps} className="paystack-btn"/>
    </div>
  );
};
export default Paystack;
