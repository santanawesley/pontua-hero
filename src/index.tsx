import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChosenProfileProvider from "./contexts/ChosenProfileContext";
import LoginProvider from "./contexts/LoginContext";
import RoutesApp from "./routes";
import "./styles/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <LoginProvider>
        <ChosenProfileProvider>
          <RoutesApp />
        </ChosenProfileProvider>
      </LoginProvider>
      <ToastContainer />
    </React.StrictMode>
  </BrowserRouter>
);
