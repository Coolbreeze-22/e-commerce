import React, { useState } from "react";
import "./OrderModal.css";
import { OrderProps } from "../../../states/redux/reducerTypes";
import { updateOrderByAdmin } from "../../../controller/orderController";
import { IoMdClose } from "react-icons/io";
import { ClickAwayListener } from "@mui/material";
import { useDispatch } from "react-redux";
import { initialState } from "../../../constants/order";

interface OrderModalProps {
  modal: OrderProps;
  setModal: React.Dispatch<React.SetStateAction<OrderProps>>;
}
interface StatusProps {
  orderStatus: string;
  paymentStatus: string;
}
export const statusInitial = {
  orderStatus: "",
  paymentStatus: "",
};

const OrderModal = ({ modal, setModal }: OrderModalProps) => {
  const [status, setStatus] = useState<StatusProps>(statusInitial);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const dispatch = useDispatch();

  const updateStatus = () => {
    const { orderStatus, paymentStatus } = status;
    const data =
      orderStatus && paymentStatus
        ? status
        : orderStatus && !paymentStatus
        ? { orderStatus }
        : paymentStatus && !orderStatus
        ? { paymentStatus }
        : {};

    updateOrderByAdmin({ id: modal.id, updateData: data, dispatch });
    setIsEdit(false);
    setStatus(statusInitial);
    setModal(initialState);
  };

  const handleClose = () => {
    setIsEdit(false);
    setStatus(statusInitial);
  };

  const handleClickAway = () => {
    setModal(initialState);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <section className="mng-orders-modal">
        <aside className="mng-orders-change">
          <button onClick={() => setIsEdit(true)}>Change Status</button>
        </aside>

        {isEdit && (
          <section className="mng-orders-update-wrapper">
            <aside>
              <IoMdClose
                size={25}
                className="mng-orders-close-icon"
                onClick={handleClose}
              />
              {(status.orderStatus || status.paymentStatus) && (
                <button
                  className="mng-orders-update-btn"
                  onClick={updateStatus}
                >
                  Update
                </button>
              )}
            </aside>
            <div className="mng-orders-update">
              <aside>
                <label>Order Status</label>
                <br />
                <select
                  className="mng-orders-select-1"
                  value={modal.orderStatus}
                  onChange={(e) =>
                    setStatus((prev) => ({
                      ...prev,
                      orderStatus: e.target.value,
                    }))
                  }
                >
                  <option value="delivered">Delivered</option>
                  <option value="shipped">Shipped</option>
                  <option value="processing">Processing</option>
                </select>
              </aside>
              <aside>
                <label>Payment Status</label>
                <br />
                <select
                  className="mng-orders-select-1"
                  value={modal.paymentStatus}
                  onChange={(e) =>
                    setStatus((prev) => ({
                      ...prev,
                      paymentStatus: e.target.value,
                    }))
                  }
                >
                  <option value="success">Success</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </aside>
            </div>
          </section>
        )}

        <div>
          <p>First Name:</p>
          <p>{modal.firstName}</p>
        </div>
        <div>
          <p>User Email:</p>
          <p>{modal.email}</p>
        </div>
        <div>
          <p>Phone Number:</p>
          <p>{modal.phoneNumber}</p>
        </div>
        <div>
          <p>Apartment:</p>
          <p>{modal.apartment}</p>
        </div>
        <div>
          <p>Address:</p>
          <p>{modal.address}</p>
        </div>
        <div>
          <p>Company Name:</p>
          <p>{modal.companyName}</p>
        </div>
        <div>
          <p>Order Id:</p>
          <p>{modal.id}</p>
        </div>
        <div>
          <p>Transaction Id:</p>
          <p>{modal.transactionId ? modal.transactionId : "none"}</p>
        </div>
        <div>
          <p>Reference Id:</p>
          <p>{modal.refId ? modal.refId : "none"}</p>
        </div>
        <div>
          <p>User Id:</p>
          <p>{modal.userId}</p>
        </div>
        <div>
          <p>Order Status:</p>
          <p>{modal.orderStatus}</p>
        </div>
        <div>
          <p>Payment Status:</p>
          <p>{modal.paymentStatus}</p>
        </div>
        <div>
          <p>Payment Mode:</p>
          <p>{modal.paymentMode}</p>
        </div>
        <div>
          <p>Delivery Fee:</p>
          <p>₦{modal.deliveryFee}</p>
        </div>
        <div>
          <p>Subtotal:</p>
          <p>₦{modal.subtotal}</p>
        </div>
        <div>
          <p>Total:</p>
          <p>₦{modal.total}</p>
        </div>
        <div>
          <p>Created On:</p>
          <p>{new Date(Number(modal.createdAt)).toISOString()}</p>
        </div>
        <div>
          <p>Updated On:</p>
          <p>
            {modal.updatedAt
              ? new Date(Number(modal.updatedAt)).toISOString()
              : "Not updated"}
          </p>
        </div>
        <header className="mng-order-item-header">
          <aside></aside>
          <p>Items</p>
        </header>
        {modal.items.map((item, index) => (
          <section key={index} className="mng-orders-items">
            <div>
              <img src={item.photo} alt="loading" loading="lazy" />
            </div>
            <div>
              <p>Item Id:</p>
              <p>{item.id}</p>
            </div>
            <div>
              <p>Name:</p>
              <p>{item.name}</p>
            </div>
            <div>
              <p>Brand:</p>
              <p>{item.brand}</p>
            </div>
            <div>
              <p>Description:</p>
              <p>{item.description}</p>
            </div>
            <div>
              <p>Price:</p>
              <p>₦{item.price}</p>
            </div>
            <div>
              <p>Discounted Price:</p>
              <p>₦{item.discountedPrice}</p>
            </div>
            <div>
              <p>Instock</p>
              <p>{item.inStock}</p>
            </div>
            <div>
              <p>Quantity:</p>
              <p>{item.quantity}</p>
            </div>
            <div>
              <p>Size:</p>
              <p>{item.size}</p>
            </div>
            <div>
              <p>Category:</p>
              <p>{item.category}</p>
            </div>
            <div>
              <p>Sub Category:</p>
              <p>{item.subCategory}</p>
            </div>
            <div>
              <p>Color:</p>
              <p
                style={{
                  border:"2px solid rgb(107, 106, 106)",
                  backgroundColor: item.color,
                  width: "20px",
                  height: "20px",
                  borderRadius: "20px",
                }}
              ></p>
            </div>
            <hr className="mng-orders-hr" />
          </section>
        ))}
      </section>
    </ClickAwayListener>
  );
};

export default OrderModal;
