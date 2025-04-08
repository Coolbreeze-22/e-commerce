import { toast } from "react-toastify";

export const toastNotification = (
  message: string,
  type: "success" | "warning" | "error"
) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "error":
      toast.error(message);
      break;
    default:
      toast.error("Invalid error type");
  }
};
