import { render, screen } from "@testing-library/react";
import Home from "./index";

test("renders word Home", () => {
  // descrição incorreta - alterar
  render(<Home />);
  const titleHome = screen.getByText(/Home/i);
  expect(titleHome).toBeInTheDocument();
});
