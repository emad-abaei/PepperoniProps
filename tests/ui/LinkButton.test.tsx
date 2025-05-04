import React from "react";
import { MemoryRouter } from "react-router";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import LinkButton from "../../src/ui/LinkButton";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");

  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe("LinkButton", () => {
  it("renders a link when 'to' is not -1", () => {
    render(
      <MemoryRouter>
        <LinkButton to='/menu'>Menu</LinkButton>
      </MemoryRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/menu");
    expect(link).toHaveTextContent("Menu");
  });

  it("renders a button when 'to' is -1 and triggers navigate", () => {
    render(
      <MemoryRouter>
        <LinkButton to='-1'>Go Back</LinkButton>
      </MemoryRouter>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
