import { useContext } from "react";
import { CharactersContext } from "../../contexts/CharactersContext";

const useCharactersContext = () => {
  const context = useContext(CharactersContext);
  if (context === undefined) {
    throw new Error("Não foi encontrado dentro do Contexto");
  }

  return context;
};

export default useCharactersContext;
