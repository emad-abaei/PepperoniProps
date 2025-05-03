import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import { BrowserRouter } from "react-router";
import { vi } from "vitest";

const renderWithRouter = (ui: React.ReactNode) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

describe("Button", () => {
  it("renders as a button by default", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("renders as a link when 'to' prop is provided", () => {
    renderWithRouter(<Button to='/menu'>Go to Menu</Button>);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/menu");
  });

  it("handles onClick", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("is disabled when 'disabled' is true", () => {
    render(<Button disabled>Can't click</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
