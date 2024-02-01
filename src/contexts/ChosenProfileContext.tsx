import { ReactNode, createContext, useState } from "react";

interface MyComponentProps {
  children: ReactNode;
}

export type ChosenProfileContextType = {
  chosenProfile: string;
  changeChosenProfile: (profile: string) => void;
};

export const ChosenProfileContext = createContext<ChosenProfileContextType>({
  chosenProfile: "",
  changeChosenProfile: () => {},
});

const ChosenProfileProvider: React.FC<MyComponentProps> = ({ children }) => {
  const [chosenProfile, setChosenProfile] = useState("");

  const changeChosenProfile = (profile: string) => {
    setChosenProfile(profile);
  };

  const contextValue: ChosenProfileContextType = {
    chosenProfile,
    changeChosenProfile,
  };

  return (
    <ChosenProfileContext.Provider value={contextValue}>
      {children}
    </ChosenProfileContext.Provider>
  );
};

export default ChosenProfileProvider;
