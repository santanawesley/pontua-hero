import React, { createContext, ReactNode, useState } from "react";
import { Person } from "../types/interfaces";

interface MyComponentProps {
  children: ReactNode;
}

export type CharactersContextType = {
  persons: Person[];
  saveCharacters: (persons: Person[]) => void;
};

export const CharactersContext = createContext<CharactersContextType>({
  persons: [],
  saveCharacters: () => {},
});

const CharactersProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [persons, setPersons] = useState([] as Person[]);

  const saveCharacters = (characters: Person[]) => {
    setPersons(characters);
  };

  const contextValue: CharactersContextType = {
    persons,
    saveCharacters,
  };

  return (
    <CharactersContext.Provider value={contextValue}>
      {children}
    </CharactersContext.Provider>
  );
};

export default CharactersProvider;
