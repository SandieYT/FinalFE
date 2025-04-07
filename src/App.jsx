import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import { ToastConfig } from "./config/toastConfig";
import "./index.css";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastConfig />
    </>
  );
}

export default App;
