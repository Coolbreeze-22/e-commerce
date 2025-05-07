import "./ManageOrders.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../states/redux/store";
import Navbar from "../Navbar/Navbar";
import { useEffect, useRef, useState } from "react";
import { getAllUsersOrders } from "../../controller/orderController";
// import { deleteOrder } from "../../controller/orderController";
import { GoKebabHorizontal } from "react-icons/go";
import { OrderProps } from "../../states/redux/reducerTypes";
import OrderModal from "./OrderModal/OrderModal";
import Loading from "../Loading/Loading";
import { initialState } from "../../constants/order";

const ManageOrders = () => {
  const { allUsersOrders, allUsersTotal, isLoading } = useSelector(
    (state: RootState) => state.orderReducer
  );
  const { user } = useSelector((state: RootState) => state.userReducer);

  const [modal, setModal] = useState<OrderProps>(initialState);

  const ordersRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getAllUsersOrders({ id: user.id, dispatch });
  }, []);

  let timeoutId: NodeJS.Timeout | undefined;

  const handleClick = (order: OrderProps) => {
    clearTimeout(timeoutId);

    setModal(order);
    timeoutId = setTimeout(() => {
      ordersRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  function orderStatus(status: string) {
    return status === "delivered"
      ? "orders-green"
      : status === "shipped"
      ? "orders-orange"
      : "";
  }
  function paymentStatus(status: string) {
    return status === "success"
      ? "orders-green"
      : status === "unpaid"
      ? "orders-red"
      : "";
  }

  return (
    <Navbar>
      {isLoading ? (
        <Loading />
      ) : (
        <main className="mng-orders-container">
          <div className="mng-orders-routes">
            <aside className="mng-orders-route1" onClick={() => navigate("/")}>
              Home
            </aside>
            <aside className="mng-orders-route-slash">/</aside>
            <aside
              className="mng-orders-route1"
              onClick={() => navigate(-1)}
            >
              admin
            </aside>
            <aside className="mng-orders-route-slash">/</aside>
            <aside className="mng-orders-route2">manage-orders</aside>
          </div>
          <div className="mng-orders-body">
            <div className="mng-orders-total">
              <p>Total</p>
              <p>₦{allUsersTotal}</p>
            </div>
            <header className="mng-orders-header">
              <p>Order Status</p>
              <p>Payment Status</p>
              <p>Payment Mode</p>
              <p>Total</p>
              <p>Created On</p>
            </header>
            {allUsersOrders.map((order, index) => (
              <div key={index} className="mng-orders-content">
                <p className={orderStatus(order.orderStatus)}>
                  {order.orderStatus}
                </p>
                <p className={paymentStatus(order.paymentStatus)}>
                  {order.paymentStatus}
                </p>
                <p>{order.paymentMode}</p>
                <p>₦{order.total}</p>
                <time>{new Date(Number(order.createdAt)).toDateString()}</time>
                <GoKebabHorizontal
                  size={25}
                  className="mng-orders-more-icon"
                  onClick={() => handleClick(order)}
                />
              </div>
            ))}
            {modal.id && (
              <div ref={ordersRef}>
                <OrderModal modal={modal} setModal={setModal} />
              </div>
            )}
          </div>
        </main>
      )}
    </Navbar>
  );
};

export default ManageOrders;
