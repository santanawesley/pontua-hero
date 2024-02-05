import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useCharactersContext,
  useSelectedCharacterContext,
} from "../../services/hook";
import api from "../../services/api";
import { HeaderMobile, Search, SideMenu } from "../../components";
import { Loading, Pagination, showToast } from "../../utils";
import { Person } from "../../types/interfaces";
import "./home.scss";

const Home = () => {
  const navigate = useNavigate();
  const { persons, saveCharacters } = useCharactersContext();
  const { saveSelectedCharacter } = useSelectedCharacterContext();

  const [characters, setCharacters] = useState([] as Person[]);
  const [filteredCharacters, setFilteredCharacters] = useState([] as Person[]);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  // Código de Paginação
  const itemsPerPage = isDesktop ? 10 : 5; // Número de itens por página
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleItems = filteredCharacters.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

  const gotToPage = (page: number) => {
    setCurrentPage(page);
  };
  // Fim da paginação

  const checkStorageLogin = () => {
    const isLogged = localStorage.getItem("loggedInHero");
    if (!isLogged) navigate("/login");
  };

  const getSelectedProfile = async () => {
    const allPersons = persons.length ? persons : await getCharacters();
    allPersons && setCharacters(allPersons);
    allPersons && setFilteredCharacters(allPersons);
  };

  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await api.getCharacters();
      if ("results" in response) {
        saveCharacters(response.results);
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

  const closeSideMenu = (closeMenu: boolean) => {
    setShowSideMenu(closeMenu);
  };

  const openSideMenu = (openMenu: boolean) => {
    setShowSideMenu(openMenu);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."; // Adiciona os três pontos no final se precisar de limitar o texto.
    }
    return text;
  };

  const showDetailsCharacter = (person: Person) => {
    saveSelectedCharacter(person);
    navigate("/perfil");
  };

  const returnFilteredCharacters = (dataFiltered: any) => {
    setFilteredCharacters(dataFiltered);
  };

  const termSearch = (term: string) => {
    setSearchedTerm(term);
  };

  return (
    <div className="wrapper-home" style={{ display: "flex" }}>
      {showSideMenu && <SideMenu closeMenu={closeSideMenu} />}
      <div className="home">
        {!isDesktop && <HeaderMobile openSideMenu={openSideMenu} />}
        <Search
          allCharacters={characters}
          returnSearch={returnFilteredCharacters}
          termSearch={termSearch}
        />
        <div className="cards-and-pagination">
          {loading ? (
            <Loading size="large" />
          ) : searchedTerm.length && !filteredCharacters.length ? (
            <div className="search-not-found">
              <p>Agente não encontrado!</p>{" "}
              <p>Fique à vontade para procurar outro.</p>
            </div>
          ) : (
            <>
              <div className="wrapper-cards">
                {visibleItems.map((person) => {
                  return (
                    <div
                      className="cards"
                      key={person.id}
                      onClick={() => showDetailsCharacter(person)}
                    >
                      <img
                        src={
                          person?.thumbnail?.path +
                          "." +
                          person?.thumbnail?.extension
                        }
                        alt={person?.name}
                        className="img-cards"
                      />
                      <div className="info-cards">
                        <p className="card-name">{person?.name}</p>
                        <p className="card-description">
                          {truncateText(
                            person?.description,
                            isDesktop ? 150 : 300
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={gotToPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
