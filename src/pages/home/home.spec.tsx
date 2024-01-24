import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";

test("renders learn react link", () => {
  render(<Home />);
  const titleHome = screen.getByText(/Home/i);
  expect(titleHome).toBeInTheDocument();
});
