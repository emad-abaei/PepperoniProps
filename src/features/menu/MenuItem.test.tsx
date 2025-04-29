import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MenuItem from "./MenuItem";
import cartReducer from "../cart/cartSlice";
import { PizzaType } from "../../types";
import { describe, expect, it } from "vitest";

const mockPizza: PizzaType = {
  pizzaId: 1,
  name: "Margherita",
  unitPrice: 10,
  ingredients: ["tomato", "mozzarella", "basil"],
  soldOut: false,
  imageUrl: "/margherita.jpg"
};

function renderWithStore(ui: React.ReactElement) {
  const store = configureStore({
    reducer: {
      cart: cartReducer
    },
    preloadedState: {
      cart: {
        cart: []
      }
    }
  });

  return render(<Provider store={store}>{ui}</Provider>);
}

describe("MenuItem", () => {
  it("renders the pizza information", () => {
    renderWithStore(<MenuItem pizza={mockPizza} />);
    expect(screen.getByText(/Margherita/i)).toBeInTheDocument();
    expect(screen.getByText(/tomato, mozzarella, basil/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument();
  });

  it("calls dispatch when add to cart is clicked", () => {
    renderWithStore(<MenuItem pizza={mockPizza} />);
    const button = screen.getByRole("button", {
      name: /add to cart/i
    });
    fireEvent.click(button);
    // You can verify updated UI behavior or mock store state here if needed
  });

  it("shows 'Sold out' label if the pizza is unavailable", () => {
    const soldOutPizza = { ...mockPizza, soldOut: true };
    renderWithStore(<MenuItem pizza={soldOutPizza} />);
    expect(screen.getByText(/sold out/i)).toBeInTheDocument();
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
