import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  iconArrowReturn,
  iconDashboard,
  iconDashboardRed,
  iconUserBlack,
  iconUserRed,
  logoBlue,
} from "../../assets/icons";
import "./sideMenu.scss";
import useCharactersContext from "../../services/hook/useCharactersContext";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveCharacters } = useCharactersContext();
  const [pageActive, setPageActive] = useState("");

  useEffect(() => {
    // Atualiza a página ativa com base na URL
    const path = location.pathname;
    if (path === "/") {
      setPageActive("home");
    } else if (path === "/perfil") {
      setPageActive("profile");
    } else {
      setPageActive("");
    }
  }, [location.pathname]);

  const goToHome = () => {
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/perfil");
  };

  const logOut = () => {
    localStorage.removeItem("loggedInHero");
    localStorage.removeItem("profileHero");
    saveCharacters([]);
  };

  return (
    <div className="side-menu">
      <div className="logo-menu">
        <img src={logoBlue} alt="" />
      </div>
      <div className="options-menu">
        <div
          className={`item-menu ${
            pageActive === "home" ? "option-highlight" : ""
          }`}
          onClick={goToHome}
        >
          <img
            src={pageActive === "home" ? iconDashboardRed : iconDashboard}
            alt=""
          />
          Home
        </div>
        <div
          className={`item-menu ${
            pageActive === "profile" ? "option-highlight" : ""
          }`}
          onClick={goToProfile}
        >
          <img
            src={pageActive === "profile" ? iconUserRed : iconUserBlack}
            alt=""
          />
          <p>Perfil</p>
        </div>
      </div>
      <div className="footer-menu" onClick={logOut}>
        <img src={iconArrowReturn} alt="" />
        <p>Sair</p>
      </div>
    </div>
  );
};

export default SideMenu;
