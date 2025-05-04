import React from "react";
import * as reactRedux from "react-redux";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CartItem from "../../../src/features/cart/CartItem";

beforeAll(() => {
  vi.mock("react-redux", async () => ({
    ...(await vi.importActual("react-redux")),
    useSelector: vi.fn()
  }));
});

// Mock child components
vi.mock("../../../src/features/cart/DeleteItem", () => ({
  default: () => <div>Mocked DeleteItem</div>
}));

vi.mock("../../../src/features/cart/UpdateItemQuantity", () => ({
  default: () => <div>Mocked UpdateItemQuantity</div>
}));

// Mock helper
vi.mock("../../../src/utils/helpers", () => ({
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
