import "./Error404.css";
import Navbar from "../Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import CustomButton from "../CustomButton/CustomButton";

const Error404 = () => {
  const navigate = useNavigate();

  return (
    <Navbar>
      <main className="error-container">
        <div className="error-routes">
          <aside className="error-route1" onClick={() => navigate("/")}>
            Home
          </aside>
          <aside className="error-route-slash">/</aside>
          <aside className="error-route2">404 Error</aside>
        </div>
        <div className="error-body">
          <header>404 Not Found</header>
          <p>Your visited page not found. You may go to home page.</p>
          <CustomButton
            text="Back to home page"
            className="error-btn"
            onClick={() => navigate("/")}
          />
        </div>
      </main>
    </Navbar>
  );
};

export default Error404;
