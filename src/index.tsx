import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CharactersProvider from "./contexts/CharactersContext";
import RoutesApp from "./routes";
import "./styles/main.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <CharactersProvider>
        <RoutesApp />
      </CharactersProvider>
      <ToastContainer />
    </React.StrictMode>
  </BrowserRouter>
);
