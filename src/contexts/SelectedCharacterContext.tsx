import React, { createContext, ReactNode, useState } from "react";
import { Person } from "../types/interfaces";

interface MyComponentProps {
  children: ReactNode;
}

export type selectedCharacterContextType = {
  selectedCharacter: Person;
  saveSelectedCharacter: (selectedCharacter: Person) => void;
};

export const SelectedCharacterContext =
  createContext<selectedCharacterContextType>({
    selectedCharacter: {} as Person,
    saveSelectedCharacter: () => {},
  });

const SelectedCharacterProvider: React.FC<MyComponentProps> = ({
  children,
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState({} as Person);

  const saveSelectedCharacter = (character: Person) => {
    setSelectedCharacter(character);
  };

  const contextValue: selectedCharacterContextType = {
    selectedCharacter,
    saveSelectedCharacter,
  };

  return (
    <SelectedCharacterContext.Provider value={contextValue}>
      {children}
    </SelectedCharacterContext.Provider>
  );
};

export default SelectedCharacterProvider;
