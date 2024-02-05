import React from "react";
import { useState } from "react";

import "./menuProfile.scss";

const MenuProfile = (props: any) => {
  const { dataMenu, returnTabSelected } = props;
  const [tabSelected, setTabSelected] = useState("geral");

  // Chaves que devem ser excluídas do menu
  const excludedKeys = [
    "id",
    "name",
    "description",
    "modified",
    "thumbnail",
    "resourceURI",
    "urls",
  ];

  // Filtrar as chaves do objeto, quer serão os itens do Menu
  const menuKeys =
    dataMenu &&
    Object.keys(dataMenu).filter(
      (key) =>
        !excludedKeys.includes(key) &&
        dataMenu[key].items &&
        dataMenu[key].items.length > 0
    );

  const selectTab = (tab: string) => {
    setTabSelected(tab);
    returnTabSelected(tab);
  };

  return (
    <nav className="menu-profile">
      <ul>
        <li
          className={`item-menu ${tabSelected === "geral" ? "active-tab" : ""}`}
          onClick={() => selectTab("geral")}
        >
          Visão Geral
        </li>
        {menuKeys?.map((item: string) => {
          return (
            <li
              className={`item-menu ${
                tabSelected.toLowerCase() === item.toLowerCase()
                  ? "active-tab"
                  : ""
              }`}
              onClick={() => selectTab(item)}
              key={item}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MenuProfile;
