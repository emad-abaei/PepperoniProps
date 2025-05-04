import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import Header from "../../src/ui/Header";

// Mock children components
vi.mock("../../src/features/order/SearchOrder", () => ({
  default: () => <div>Mocked SearchOrder</div>
}));

vi.mock("../../src/features/user/Username", () => ({
  default: () => <div>Mocked Username</div>
}));

vi.mock("../../src/ui/PizzaImage", () => ({
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
