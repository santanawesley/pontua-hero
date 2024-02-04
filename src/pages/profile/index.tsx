import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useCharactersContext,
  useSelectedCharacterContext,
} from "../../services/hook";
import { SideMenu } from "../../components";
import MenuProfile from "./components/menuProfile";
import api from "../../services/api";
import { Loading, showToast } from "../../utils";
import { iconHamburguer, logoBlue } from "../../assets/icons";
import "./profile.scss";

const Profile = () => {
  const { persons } = useCharactersContext();
  const { selectedCharacter } = useSelectedCharacterContext();
  const navigate = useNavigate();

  const [chooseCharacterData, setChooseCharacterData] = useState<any>({});
  const [tabSelected, setTabSelected] = useState("geral");
  const [contentTab, setContentTab] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);

  useEffect(() => {
    checkStorageLogin();
    getSelectedProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkStorageLogin = () => {
    const isLogged = localStorage.getItem("loggedInHero");
    if (!isLogged) navigate("/login");
  };

  const getSelectedProfile = async () => {
    // Pegar seleção da Home no useContext, se não tiver pegar a do login no Storage, se não, direciona para a Home
    const chooseStoragePersonId = localStorage.getItem("profileHero");
    if (selectedCharacter.name) {
      setChooseCharacterData(setChooseCharacterData);
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

  const closeSideMenu = () => {
    setShowSideMenu(false);
  };

  return (
    <div className="wrapper-profile">
      {showSideMenu && <SideMenu closeMenu={closeSideMenu} />}
      <div className="main">
        <div className="call-menu-mobile" onClick={() => setShowSideMenu(true)}>
          {!showSideMenu && (
            <>
              <img
                src={iconHamburguer}
                alt="Abrir Menu"
                className="icon-menu"
              />
              <img src={logoBlue} alt="" />
            </>
          )}
        </div>
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
                    alt=""
                    className=""
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
                  {contentTab.map((item: any) => {
                    return <li>{item.name}</li>;
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
