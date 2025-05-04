import React from "react";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import PageNotFound from "../../src/ui/PageNotFound";

vi.mock("../../src/ui/PizzaImage", () => ({
  default: ({ className }: { className?: string }) => (
    <img className={className} alt='Mocked Pizza' />
  )
}));

vi.mock("../../src/ui/Button", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  )
}));

describe("PageNotFound", () => {
  it("renders 404 page layout", () => {
    render(<PageNotFound />);
    expect(screen.getAllByText("4")).toHaveLength(2);
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /go to home/i })
    ).toBeInTheDocument();
  });
});
