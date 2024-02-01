import { ReactNode } from "react";
import { toast } from "react-toastify";

type ToastType = "info" | "error" | "success";

const showToast = (type: ToastType, message: ReactNode) => {
  if (type === "info") {
    toast.info(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  }

  if (type === "error") {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  }

  if (type === "success") {
    toast.success(message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
    });
  }
};

export default showToast;
