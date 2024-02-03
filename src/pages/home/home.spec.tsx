import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./index";
import { BrowserRouter } from "react-router-dom";

it("renders word Home", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const titleHome = screen.queryAllByText(/Home/i);
  expect(titleHome.length).toBeGreaterThan(0);
});
