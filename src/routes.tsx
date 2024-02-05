import React from "react";
import { Route, Routes } from "react-router-dom";

import { Home, Login, Profile } from "./pages";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/perfil" element={<Profile />} />
    </Routes>
  );
};

export default RoutesApp;
