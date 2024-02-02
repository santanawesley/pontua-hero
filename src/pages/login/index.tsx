import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  iconArrowEnter,
  iconAt,
  iconCheck,
  iconChevronDown,
  iconChevronUp,
  iconEyeActive,
  iconEyeInactive,
  iconShield,
  iconUser,
  logo,
} from "../../assets/icons";
import building from "../../assets/building.webp";
import { Loading, showToast, validate } from "../../utils";
import mockLogin from "../../services/api/mock";
import { IMockLogin, Person } from "../../types/interfaces";
import useCharactersContext from "../../services/hook/useCharactersContext";
import api from "../../services/api";
import "./login.scss";

interface LoginScreenData {
  title?: string;
  signTitle?: string;
  description?: string;
  email?: string;
  textButtonOne?: string;
  link?: string;
  inputTwo?: string;
}

const Login = () => {
  const navigate = useNavigate();
  const { saveCharacters } = useCharactersContext();

  const [loginStep, setLoginStep] = useState("logInto");
  const [dataLoginScreen, setDataLoginScreen] = useState({
    title: "Bem-vindo",
    signTitle: ".",
    description: "informe as suas credenciais de acesso ao portal",
    email: "",
    textButtonOne: "entrar",
    link: "Esqueceu a senha?",
    inputTwo: "",
  } as LoginScreenData);

  const [textEmail, setTextEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(true);
  const [textPassword, setTextPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [ctaDisabled, setCtaDisabled] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState({} as Person);
  const [selectedAgentStorage, setSelectedAgentStorage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [characters, setCharacters] = useState([] as Person[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isLoggedInStorage = localStorage.getItem("loggedInHero");
    isLoggedInStorage && setLoggedIn(true);
    isLoggedInStorage && setLoginStep("selectProfile");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    toogleEnableCta();
  }, [loginStep]);

  useEffect(() => {
    let isDisabled = true;

    if (loginStep === "emailSent") {
      isDisabled = false;
    } else if (loginStep === "logInto") {
      isDisabled = !(textPassword.length && validate.validateEmail(textEmail));
    } else if (loginStep === "recoverPassword") {
      isDisabled = !validate.validateEmail(textEmail);
    } else if (loginStep === "selectProfile") {
      isDisabled = !selectedAgent.name;
    }

    setCtaDisabled(isDisabled);
  }, [
    textEmail,
    emailIsValid,
    textPassword,
    passwordIsValid,
    loginStep,
    selectedAgent,
  ]);

  useEffect(() => {
    const loginScreenData: Record<string, LoginScreenData> = {
      selectProfile: {
        title: "Selecione o seu agente mais legal",
        signTitle: ".",
        description: "Tenha a visão completa do seu agente.",
        textButtonOne: "Entrar",
      },
      recoverPassword: {
        title: "Recuperar senha",
        signTitle: ".",
        description:
          "Informe o e-mail do seu cadastro. Nós estaremos realizando o envio de um link com as instruções para você redefinir a sua senha.",
        textButtonOne: "enviar link",
      },
      emailSent: {
        title: "Tudo certo",
        signTitle: " ;)",
        description:
          "Foi enviado um e-mail para você com instruções de como redefinir a sua senha.",
        textButtonOne: "voltar para login",
      },
      logInto: {
        title: "Bem-vindo",
        signTitle: ".",
        description: "informe as suas credenciais de acesso ao portal",
        textButtonOne: "entrar",
      },
    };

    setDataLoginScreen((currentState) => ({
      ...currentState,
      ...(loginScreenData[loginStep] || {}),
    }));
  }, [loginStep]);

  useEffect(() => {
    loggedIn && getCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  const getCharacters = async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await api.getCharacters();
      if ("results" in response) {
        saveCharacters(response.results);
        setCharacters(response.results);
        savePersonOfStorage(response.results);
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

  const savePersonOfStorage = (persons: Person[]) => {
    const idProfileHeroInStorage = localStorage.getItem("profileHero");

    idProfileHeroInStorage &&
      setSelectedAgentStorage(Number(idProfileHeroInStorage));

    persons.map((person) => {
      return (
        person.id === Number(idProfileHeroInStorage) && setSelectedAgent(person)
      );
    });
  };

  const toogleEnableCta = () => {
    setCtaDisabled(true);
    setTextEmail("");
    setTextPassword("");
  };

  const validateEmail = (event: React.FocusEvent<HTMLInputElement>) => {
    setEmailIsValid(validate.validateEmail(event.target.value));
  };

  const validatePassword = () => {
    setPasswordIsValid(!!textPassword.length);
  };

  const handleLogin = (): IMockLogin | Error => {
    try {
      const response: IMockLogin = mockLogin(textEmail, textPassword);
      return response;
    } catch (error) {
      return error as Error;
    }
  };

  const logIn = async () => {
    const resultLogin = handleLogin();
    if (resultLogin instanceof Error || !resultLogin?.isAuthenticated)
      return showToast("error", "E-mail e/ou senha inválida!");

    setLoggedIn(true);
    localStorage.setItem("loggedInHero", "true");

    setLoginStep("selectProfile");
  };

  const saveProfile = () => {
    navigate("/perfil");
  };

  const changeLoginScreen = (step?: string) => {
    switch (loginStep) {
      case "logInto":
        if (step === "forgotPassword") {
          setLoginStep("recoverPassword");
        } else {
          logIn();
        }
        break;
      case "recoverPassword":
        setLoginStep("emailSent");
        break;
      case "selectProfile":
        saveProfile();
        break;
      default:
        setLoginStep("logInto");
    }
  };

  const chooseProfile = (option: Person) => {
    setIsOpen(false);
    localStorage.setItem("profileHero", option.id.toString());
    setSelectedAgent(option);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const loginScreen = () => {
    return (
      <div className="login-screen">
        <h1 className="title-login">
          {dataLoginScreen.title}
          <span className="sign-title">{dataLoginScreen.signTitle}</span>
        </h1>
        <p className="description-login">{dataLoginScreen.description}</p>
        {(loginStep === "logInto" || loginStep === "recoverPassword") && (
          <div className="wrapper-input-icon">
            <input
              type="email"
              placeholder="Informe seu e-mail"
              className="input-login"
              value={textEmail}
              onChange={(e) => setTextEmail(e.target.value)}
              onBlur={validateEmail}
            />
            <img className="icons icons-input" src={iconAt} alt="" />
            {!emailIsValid && (
              <p className="msg-error">Formato de e-mail inválido</p>
            )}
          </div>
        )}
        {loginStep === "logInto" && (
          <div className="wrapper-input-icon">
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Informe sua senha"
              className="input-login"
              value={textPassword}
              onChange={(e) => setTextPassword(e.target.value)}
              onBlur={validatePassword}
            />
            <img
              className="icons icons-input icon-link"
              src={showPassword ? iconEyeActive : iconEyeInactive}
              onClick={() => setShowPassword((currentState) => !currentState)}
              alt=""
            />
            {!passwordIsValid && (
              <p className="msg-error">Campo de senha é obrigatório</p>
            )}
          </div>
        )}
        {loginStep === "selectProfile" && (
          <div className="simple-dropdown">
            <div
              className={`dropdown-header ${isOpen ? "highlight-input" : ""}`}
              onClick={toggleDropdown}
            >
              {loading ? (
                <Loading />
              ) : (
                <div
                  className={`image-name-profile ${
                    selectedAgent.name ? "" : "gray-500"
                  }`}
                >
                  {selectedAgent?.thumbnail ? (
                    <img
                      src={
                        selectedAgent?.thumbnail?.path +
                        "." +
                        selectedAgent?.thumbnail?.extension
                      }
                      alt=""
                    />
                  ) : (
                    <img src={iconUser} alt="" />
                  )}
                  {selectedAgent.name
                    ? selectedAgent.name
                    : "Selecione um agente"}
                </div>
              )}
              {isOpen ? (
                <img src={iconChevronUp} alt="" />
              ) : (
                <img src={iconChevronDown} alt="" />
              )}
            </div>
            {isOpen && (
              <div className="dropdown-options">
                {characters?.map((option) => {
                  return (
                    <div
                      onClick={() => chooseProfile(option)}
                      className={`line-option-profile ${
                        option.id === selectedAgentStorage
                          ? "background-light"
                          : ""
                      }`}
                      key={option.id}
                    >
                      <div className="image-name-profile">
                        <img
                          src={
                            option.thumbnail.path +
                            "." +
                            option.thumbnail.extension
                          }
                          alt=""
                        />
                        {option.name}
                      </div>
                      {option.id === selectedAgentStorage && (
                        <img src={iconCheck} alt="" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        {!isOpen && (
          <div className="wrapper-input-icon">
            <button
              className={`button-cta ${ctaDisabled ? "disabled" : ""} ${
                loginStep === "selectProfile" ? "cta-profile" : ""
              }`}
              disabled={ctaDisabled}
              onClick={() => changeLoginScreen()}
            >
              {dataLoginScreen.textButtonOne}
            </button>
            {loginStep === "logInto" && (
              <img className="icons icon-button" src={iconArrowEnter} alt="" />
            )}
          </div>
        )}
        {loginStep === "logInto" && (
          <div className="wrapper-icon-button">
            <img className="icons" src={iconShield} alt="" />
            <button
              className="button-link"
              onClick={() => changeLoginScreen("forgotPassword")}
            >
              Esqueceu a senha?
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="page-login">
      <div className="wrapper-page-login">
        <img className="logo" src={logo} alt="P" />
        <div className="body-login">
          <img className="img" src={building} alt="P" />
          <div className="wrapper-login-screen">{loginScreen()}</div>
        </div>
      </div>
    </div>
  );
};

export default Login;
