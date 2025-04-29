import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../controller/userController";
import { useStateContext } from "../../context/context";

export const useLabelNavigate = () => {
  const navigate = useNavigate();

  return (label: string) => {
    switch (label) {
      case "home":
        navigate("/");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "cart":
        navigate("/cart");
        break;
      case "wishlist":
        navigate("/wishlist");
        break;
      case "about":
        navigate("/about");
        break;
      case "account":
        navigate("/account");
        break;
      case "contact":
        navigate("/contact");
        break;
      case "login":
        navigate("/login");
        break;
      case "orders":
        navigate("/account", { state: { to: "orders" } });
        break;
    }
  };
};

export const useLogout = () => {
  const { setIsSidebar, setIsDropdown } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return () => {
    setIsSidebar(false);
    setIsDropdown(false);
    signOut({ navigate, dispatch });
  };
};
