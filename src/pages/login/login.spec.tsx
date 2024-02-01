import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Login from "./index";
import LoginProvider from "../../contexts/LoginContext";

test("Renders the Login component correctly", () => {
  render(
    <BrowserRouter>
      <LoginProvider>
        <Login />
      </LoginProvider>
    </BrowserRouter>
  );

  // Verifica se elementos esperados estão na tela
  expect(screen.getByText(/Bem-vindo/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Informe seu e-mail/)).toBeInTheDocument();
  expect(screen.getByText(/entrar/)).toBeInTheDocument();
});

test('Changes the screen to "Recover password" when clicking on "Esqueceu a senha?"', () => {
  render(
    <BrowserRouter>
      <LoginProvider>
        <Login />
      </LoginProvider>
    </BrowserRouter>
  );

  // Clica no link "Esqueceu a senha?"
  fireEvent.click(screen.getByText(/Esqueceu a senha?/));

  // Verifica se a tela mudou para "Recuperar senha"
  expect(screen.getByText(/Recuperar senha/)).toBeInTheDocument();
});
