import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../controller/userController";
import { useStateContext } from "../../context/context";

export const useLabelNavigate = () => {
  const navigate = useNavigate();

  return (label: string) => {
    switch (label) {
      case "cart":
        navigate("/cart");
        break;
      case "wishlist":
        navigate("/wishlist");
        break;
    }
  };
};

export const useLogout = () => {
  const { setIsDropdown } = useStateContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return () => {
    navigate("/");
    setIsDropdown(false);
    signOut(dispatch);
  };
};
