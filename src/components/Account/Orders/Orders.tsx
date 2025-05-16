import { useEffect, useRef } from "react";
import "./Orders.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { Skeleton } from "@mui/material";
import { useFetchOrders } from "../../../controller/orderController";

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const { allOrders, isLoading } = useSelector(
    (state: RootState) => state.orderReducer
  );
  const dispatch = useDispatch();
  useFetchOrders({ id: user.id, dispatch, length: allOrders.length });

  const ordersRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  const orders = allOrders
    .filter((item) => item.userId === user.id)
    .sort((a, b) => Number(b.createdAt) - Number(a.createdAt));
  const userTotal = orders.reduce((total, order) => total + order.total, 0);

  useEffect(() => {
    switch (location.state?.to) {
      case "orders":
        ordersRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        break;
    }
  }, [location]);

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
    <main ref={ordersRef} className="orders-container">
      {isLoading ? (
        <>
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </>
      ) : (
        <>
          {!orders.length ? (
            <aside>
              <div ref={ref} className={inView ? "orders-animation" : ""}></div>
              <div className="orders-no-order">
                Place orders to see them here
              </div>
            </aside>
          ) : (
            <div className="orders-wrapper">
              <header className="orders-header">Orders</header>

              {orders.map((order, index) => (
                <section key={index} className="orders-list">
                  <div className="orders-info">
                    <div>
                      <p>Order ID:</p>
                      <p>{order.id}</p>
                    </div>
                    <div>
                      <p>Transaction ID:</p>
                      <p>
                        {order.transactionId ? order.transactionId : "none"}
                      </p>
                    </div>
                    <div>
                      <p>Payment Status:</p>
                      <p className={paymentStatus(order.paymentStatus)}>
                        {order.paymentStatus}
                      </p>
                    </div>
                    <div>
                      <p>Order Status:</p>
                      <p className={orderStatus(order.orderStatus)}>
                        {order.orderStatus}
                      </p>
                    </div>
                    <div>
                      <p>Delivery Fee:</p>
                      <p>₦{order.deliveryFee}</p>
                    </div>
                    <div>
                      <p>Subtotal:</p>
                      <p>₦{order.subtotal}</p>
                    </div>
                    <div>
                      <p>Total:</p>
                      <p>₦{order.total}</p>
                    </div>
                    <div>
                      <p>{moment(Number(order.createdAt)).fromNow()}</p>
                    </div>
                  </div>
                  <div className="orders-items">
                    {order.items.map((item, index) => (
                      <div key={index} className="orders-item">
                        <img src={item.photo} alt="loading" loading="lazy" />
                        <p>{item.name}</p>
                        <p>
                          ₦
                          {item.discountedPrice
                            ? item.discountedPrice
                            : item.price}
                        </p>

                        <p>{item.size}</p>
                        <p>{item.quantity}piece(s)</p>
                        <p
                          style={{ backgroundColor: item.color }}
                          className="orders-color"
                        ></p>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              <section className="orders-total">
                <p>Total:</p>
                <p className="orders-total-amount">₦{userTotal}</p>
              </section>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Orders;
