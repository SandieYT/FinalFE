import { RouterProvider } from "react-router-dom";
import Router from "./routes/Router";
import { ToastConfig } from "./config/ToastConfig";
import { ChatBot } from "./hooks/chatBot";
import "./index.css";

function App() {
  return (
    <>
      <RouterProvider router={Router} />
      <ToastConfig />
      <ChatBot />
    </>
  );
}

export default App;
