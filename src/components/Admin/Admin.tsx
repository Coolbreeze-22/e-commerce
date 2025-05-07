import "./Admin.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../states/redux/store";
import { getUsers } from "../../controller/userController";

const Admin = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (label: string) => {
    if (label === "product") {
      navigate("/admin/create-product");
    } else if (label === "orders") {
      navigate("/admin/orders");
    } else if (label === "users") {
      getUsers({ id: user.id, dispatch });
      navigate("/admin/users");
    } else if (label === "countdown") {
      getUsers({ id: user.id, dispatch });
      navigate("/admin/countdown");
    }
  };
  return (
    <Navbar>
      <main className="admin-container">
        <div className="admin-routes">
          <aside className="admin-route1" onClick={() => navigate("/")}>
            Home
          </aside>
          <aside className="admin-route-slash">/</aside>
          <aside className="admin-route2">admin</aside>
        </div>
        <section className="admin-body">
          <div className="admin-info">
            <aside className="admin-red"></aside>
            <span className="admin-header">Dashboard</span>
          </div>
          <div className="admin-content">
            <div onClick={() => handleNavigate("product")}>Create Product</div>
            <div onClick={() => handleNavigate("orders")}>Manage Orders</div>
            <div onClick={() => handleNavigate("users")}>Manage Users</div>
            <div onClick={() => handleNavigate("countdown")}>Create Countdown</div>
          </div>
        </section>
      </main>
    </Navbar>
  );
};

export default Admin;
