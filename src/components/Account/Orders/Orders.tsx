import { useEffect, useRef, useState } from "react";
import "./Orders.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../states/redux/store";
import { OrderProps } from "../../../states/redux/reducerTypes";
import moment from "moment";
import { useLocation } from "react-router-dom";
import { deleteOrder } from "../../../controller/orderController";
import { MdDeleteForever } from "react-icons/md";
import { useInView } from "react-intersection-observer";

const Orders = () => {
  const { orders, total } = useSelector(
    (state: RootState) => state.orderReducer
  );

  const [selectedOrder, setSelectedOrder] = useState<OrderProps>(
    {} as OrderProps
  );
  const viewOrderRef = useRef<HTMLDivElement>(null);
  const ordersRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });
  useEffect(() => {
    const handleScroll = () => {
      if (selectedOrder.transactionId) {
        viewOrderRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };
    handleScroll();
  }, [selectedOrder]);

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

  function statusColor(status: string) {
    return status === "delivered"
      ? "orders-green"
      : status === "success"
      ? "orders-green"
      : status === "shipped"
      ? "orders-orange"
      : "";
  }

  return (
    <main ref={ordersRef} className="orders-container">
      {!orders.length ? (
        <aside>
          <div ref={ref} className={inView ? "orders-animation" : ""}></div>
          <div className="orders-no-order">Place orders to see them here</div>
        </aside>
      ) : (
        <div className="orders-wrapper">
          <header className="orders-header">Orders</header>
          <section className="orders-caption">
            <p>Payment Status</p>
            <p>Order Status</p>
            <p>Number Of Items</p>
            <p>Amount</p>
          </section>

          {orders.map((order, index) => (
            <section
              key={index}
              className="orders-orders"
              onClick={() => setSelectedOrder(order)}
            >
              <p className={statusColor(order.paymentStatus)}>
                {order.paymentStatus}
              </p>
              <p className={statusColor(order.orderStatus)}>
                {order.orderStatus}
              </p>
              <p>{order.items.length}</p>
              <p>
                ₦{order.total}{" "}
                <MdDeleteForever
                  className="orders-delete-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteOrder(order.transactionId, dispatch);
                  }}
                />
              </p>
            </section>
          ))}

          <section className="orders-total">
            <p>Total:</p>
            <p className="orders-total-amount">₦{total}</p>
          </section>

          {selectedOrder.transactionId && (
            <section ref={viewOrderRef} className="orders-selected">
              <div>
                <div>
                  <p>Transaction id:</p>
                  <p>{selectedOrder.transactionId}</p>
                </div>
                <div>
                  <p>Payment Status:</p>
                  <p>{selectedOrder.paymentStatus}</p>
                </div>
                <div>
                  <p>Order Status:</p>
                  <p>{selectedOrder.orderStatus}</p>
                </div>
                <div>
                  <p>Delivery Fee:</p>
                  <p>₦{selectedOrder.deliveryFee}</p>
                </div>
                <div>
                  <p>Subtotal:</p>
                  <p>₦{selectedOrder.subtotal}</p>
                </div>
                <div>
                  <p>Total:</p>
                  <p>₦{selectedOrder.total}</p>
                </div>
                <div>
                  <p>{moment(Number(selectedOrder.createdAt)).fromNow()}</p>
                </div>
              </div>
              <div>
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="orders-item">
                    <img src={item.photo} alt="loading" loading="lazy" />
                    <p>{item.name}</p>
                    <p>
                      ₦
                      {item.discountedPrice ? item.discountedPrice : item.price}
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
          )}
        </div>
      )}
    </main>
  );
};

export default Orders;
