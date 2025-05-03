import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router";
import React from "react";
import { vi } from "vitest";

// Mock children components
vi.mock("../features/order/SearchOrder", () => ({
  default: () => <div>Mocked SearchOrder</div>
}));

vi.mock("../features/user/Username", () => ({
  default: () => <div>Mocked Username</div>
}));

vi.mock("./PizzaImage", () => ({
  default: ({ className }: { className?: string }) => (
    <img className={className} alt='Mocked Pizza' />
  )
}));

describe("Header", () => {
  it("renders logo and subcomponents", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("PepperoniProps")).toBeInTheDocument();
    expect(screen.getByAltText("Mocked Pizza")).toBeInTheDocument();
    expect(screen.getByText("Mocked SearchOrder")).toBeInTheDocument();
    expect(screen.getByText("Mocked Username")).toBeInTheDocument();
  });
});
