import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import CartItem from "./CartItem";
import * as reactRedux from "react-redux";

beforeAll(() => {
  vi.mock("react-redux", async () => ({
    ...(await vi.importActual("react-redux")),
    useSelector: vi.fn()
  }));
});

// Mock child components
vi.mock("./DeleteItem", () => ({
  default: () => <div>Mocked DeleteItem</div>
}));

vi.mock("./UpdateItemQuantity", () => ({
  default: () => <div>Mocked UpdateItemQuantity</div>
}));

// Mock helper
vi.mock("../../utils/helpers", () => ({
  formatCurrency: (val: number) => `$${val.toFixed(2)}`
}));

describe("CartItem", () => {
  it("renders item details and mocked children", () => {
    vi.spyOn(reactRedux, "useSelector").mockReturnValue(2);

    const fakeItem = {
      pizzaId: 1,
      name: "Pepperoni",
      quantity: 2,
      unitPrice: 10,
      totalPrice: 20
    };

    render(<CartItem item={fakeItem} />);

    expect(screen.getByText("2× Pepperoni")).toBeInTheDocument();
    expect(screen.getByText("$20.00")).toBeInTheDocument();
    expect(screen.getByText("Mocked DeleteItem")).toBeInTheDocument();
    expect(screen.getByText("Mocked UpdateItemQuantity")).toBeInTheDocument();
  });
});
