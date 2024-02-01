import { createContext, ReactNode, useState } from "react";

interface MyComponentProps {
  children: ReactNode;
}

export type LoginContextType = {
  isAuthenticated: boolean;
  toggleAuthentication: (isLogin: boolean) => void;
};

export const LoginContext = createContext<LoginContextType>({
  isAuthenticated: false,
  toggleAuthentication: () => {},
});

const LoginProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuthentication = (isLogin: boolean) => {
    setIsAuthenticated(isLogin);
  };

  const contextValue: LoginContextType = {
    isAuthenticated,
    toggleAuthentication,
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
