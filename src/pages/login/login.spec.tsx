import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Login from "./index";
import CharactersProvider from "../../contexts/CharactersContext";

it("Renders the Login component correctly", () => {
  render(
    <BrowserRouter>
      <CharactersProvider>
        <Login />
      </CharactersProvider>
    </BrowserRouter>
  );

  // Verifica se elementos esperados estão na tela
  expect(screen.getByText(/Bem-vindo/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Informe seu e-mail/)).toBeInTheDocument();
  expect(screen.getByText(/entrar/)).toBeInTheDocument();
});

it('Changes the screen to "Recover password" when clicking on "Esqueceu a senha?"', () => {
  render(
    <BrowserRouter>
      <CharactersProvider>
        <Login />
      </CharactersProvider>
    </BrowserRouter>
  );

  // Clica no link "Esqueceu a senha?"
  fireEvent.click(screen.getByText(/Esqueceu a senha?/));

  // Verifica se a tela mudou para "Recuperar senha"
  expect(screen.getByText(/Recuperar senha/)).toBeInTheDocument();
});
