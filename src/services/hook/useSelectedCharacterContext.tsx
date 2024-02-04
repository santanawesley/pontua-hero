import { useContext } from "react";
import { SelectedCharacterContext } from "../../contexts/SelectedCharacterContext";

const useSelectedCharacterContext = () => {
  const context = useContext(SelectedCharacterContext);
  if (context === undefined) {
    throw new Error("Não foi encontrado dentro do Contexto");
  }

  return context;
};

export default useSelectedCharacterContext;
