import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useCharactersContext,
  useSelectedCharacterContext,
} from "../../services/hook";
import api from "../../services/api";
import { HeaderMobile, SideMenu } from "../../components";
import MenuProfile from "./components/menuProfile";
import { Loading, showToast } from "../../utils";
import { itemsPerson } from "../../types/interfaces";
import "./profile.scss";

const Profile = () => {
  const { persons } = useCharactersContext();
  const { selectedCharacter } = useSelectedCharacterContext();
  const navigate = useNavigate();

  const [chooseCharacterData, setChooseCharacterData] = useState<any>({});
  const [tabSelected, setTabSelected] = useState("geral");
  const [contentTab, setContentTab] = useState<itemsPerson[]>(
    [] as itemsPerson[]
  );
  const [loading, setLoading] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  const isDesktop = window.innerWidth > 768;

  useEffect(() => {
    setShowSideMenu(isDesktop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    checkStorageLogin();
    getSelectedProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkStorageLogin = () => {
    const isLogged = localStorage.getItem("tokenHero");
    if (!isLogged) navigate("/login");
  };

  const getSelectedProfile = async () => {
    // Pegar seleção da Home no useContext, se não tiver pegar a do login no Storage, se não, direciona para a Home
    const chooseStoragePersonId = localStorage.getItem("profileHero");
    if (selectedCharacter.name) {
      setChooseCharacterData(selectedCharacter);
    } else if (chooseStoragePersonId) {
      const allPersons = persons.length ? persons : await getCharacters();
      const dataChoosePerson =
        allPersons &&
        allPersons.filter((person) => {
          return person.id === Number(chooseStoragePersonId);
        });
      dataChoosePerson && setChooseCharacterData(dataChoosePerson[0]);
    } else {
      navigate("/");
    }
  };

  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await api.getCharacters();
      if ("results" in response) {
        return response.results;
      } else {
        return showToast(
          "error",
          "Ocorreu um erro na busca de agentes. Tente novamente mais tarde"
        );
      }
    } catch (error) {
      return showToast(
        "error",
        "Ocorreu um erro na busca de agentes. Tente novamente mais tarde"
      );
    } finally {
      setLoading(false);
    }
  };

  const returnTabSelected = (tab: string) => {
    setTabSelected(tab);
    getContentTab(tab);
  };

  const getContentTab = (tab: string) => {
    if (chooseCharacterData[tab] && chooseCharacterData[tab].items) {
      setContentTab(chooseCharacterData[tab].items);
    }
  };

  const closeSideMenu = (closeMenu: boolean) => {
    setShowSideMenu(closeMenu);
  };

  const openSideMenu = (openMenu: boolean) => {
    setShowSideMenu(openMenu);
  };

  return (
    <div className="wrapper-profile">
      {showSideMenu && <SideMenu closeMenu={closeSideMenu} />}
      <div className="main">
        {isDesktop ? (
          <div className="div-header" />
        ) : (
          <HeaderMobile openSideMenu={openSideMenu} />
        )}
        <div className="profile">
          <h1 className="title-profile">
            Perfil <span className="divisor-title">/</span>{" "}
            <span className="name-title">{chooseCharacterData?.name}</span>
          </h1>
          <div className="wrapper-menu-profile">
            <MenuProfile
              dataMenu={chooseCharacterData}
              returnTabSelected={returnTabSelected}
            />
          </div>
          {loading ? (
            <Loading size="large" />
          ) : (
            <div className="content-tab">
              {tabSelected === "geral" ? (
                <div className="tab-geral">
                  <img
                    src={
                      chooseCharacterData?.thumbnail?.path +
                      "." +
                      chooseCharacterData?.thumbnail?.extension
                    }
                    alt={chooseCharacterData.name}
                  />
                  <div className="text-tab-geral">
                    <p className="text-name">{chooseCharacterData?.name}</p>
                    <p className="text-description">
                      {chooseCharacterData?.description}
                    </p>
                  </div>
                </div>
              ) : (
                <ul>
                  {contentTab.map((item) => {
                    return <li key={item.name}>{item.name}</li>;
                  })}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
