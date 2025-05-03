import { render, screen } from "@testing-library/react";
import PageNotFound from "./PageNotFound";
import { vi } from "vitest";

vi.mock("./PizzaImage", () => ({
  default: ({ className }: { className?: string }) => (
    <img className={className} alt='Mocked Pizza' />
  )
}));

vi.mock("./Button", () => ({
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
