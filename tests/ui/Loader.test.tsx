import React from "react";
import { render, screen } from "@testing-library/react";
import Loader from "../../src/ui/Loader";

describe("Loader", () => {
  it("renders loader with accessibility attributes", () => {
    render(<Loader />);
    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveAttribute("aria-live", "assertive");
    expect(alert.firstChild).toHaveClass("loader");
  });
});
