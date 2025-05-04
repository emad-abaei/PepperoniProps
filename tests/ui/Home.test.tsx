import React from "react";
import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { vi, type Mock } from "vitest";
import Home from "../../src/ui/Home";

// Mock dependencies
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: vi.fn()
  };
});

vi.mock("../../src/features/user/CreateUser", () => ({
  default: () => <div>Mocked CreateUser</div>
}));

vi.mock("../../src/ui/Button", () => ({
  default: ({ to, children }: any) => <a href={to}>{children}</a>
}));

describe("Home", () => {
  it("renders CreateUser when username is not set", () => {
    (useSelector as unknown as Mock).mockReturnValue("");

    render(<Home />);
    expect(screen.getByText(/mocked createuser/i)).toBeInTheDocument();
  });

  it("renders button when username is set", () => {
    (useSelector as unknown as Mock).mockReturnValue("Alice");

    render(<Home />);
    expect(screen.getByText(/continue ordering, Alice/i)).toBeInTheDocument();
  });
});
