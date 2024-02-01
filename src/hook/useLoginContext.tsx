import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";

const useLoginContext = () => {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("Não foi encontrado dentro do Contexto");
  }

  return context;
};

export default useLoginContext;
