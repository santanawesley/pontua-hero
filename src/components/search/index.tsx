import React, { ChangeEvent } from "react";
import { useLocation } from "react-router-dom";

import { iconSearch } from "../../assets/icons";
import "./search.scss";
import { Person } from "../../types/interfaces";

interface SearchProps {
  allCharacters: Person[];
  returnSearch: (returnFilteredCharacters: Person[]) => void;
  termSearch: (termSearch: string) => void;
}

const Search = (props: SearchProps) => {
  const { allCharacters, returnSearch, termSearch } = props;
  const location = useLocation();
  const path = location.pathname;
  const isHome = path === "/";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const termEntered = event.target.value;

    const filtered = allCharacters?.filter((character) =>
      character.name.toLowerCase().includes(termEntered.toLowerCase())
    );

    filtered && returnSearch(filtered);
    termEntered && termSearch(termEntered);
  };

  return (
    <div className="wrapper-search">
      {isHome && (
        <div className="search">
          <img src={iconSearch} alt="" className="icon-search" />
          <input
            type="search"
            placeholder="Busque um agente"
            className="input-search"
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
