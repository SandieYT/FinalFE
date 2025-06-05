timport { Toaster } from "react-hot-toast";

export const ToastConfig = () => (
  <Toaster
    position="top-right"
    toastOptions={{
      duration: 3000,
    }}
  />
);
