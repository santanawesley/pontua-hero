import { useContext } from "react";
import { ChosenProfileContext } from "../contexts/ChosenProfileContext";

const useChosenProfileContext = () => {
  const context = useContext(ChosenProfileContext);
  if (context === undefined) {
    throw new Error("Não foi encontrado dentro do Contexto");
  }

  return context;
};

export default useChosenProfileContext;
