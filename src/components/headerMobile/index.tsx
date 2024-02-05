import React from "react";

import { iconHamburguer, logoBlue } from "../../assets/icons";
import "./search.scss";

interface HeaderMobileProps {
  openSideMenu: (showSideMenu: boolean) => void;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({ openSideMenu }) => {
  return (
    <div className="call-menu-mobile" onClick={() => openSideMenu(true)}>
      {
        <>
          <img src={iconHamburguer} alt="Abrir Menu" className="icon-menu" />
          <img src={logoBlue} alt="Logomarca Pontua" />
        </>
      }
    </div>
  );
};

export default HeaderMobile;
