import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Loading from "./index";

describe("Loading Component", () => {
  it("renders loading component", () => {
    render(<Loading />);
    const loadingElement = screen.getByTestId("loading");
    expect(loadingElement).toBeInTheDocument();
  });
});
