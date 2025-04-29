// src/features/menu/MenuItem.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import MenuItem from "./MenuItem";
import { PizzaType } from "../../types";
import { describe, it, vi, expect, beforeEach } from "vitest";

const mockStore = configureStore([]);
const samplePizza: PizzaType = {
  pizzaId: 1,
  name: "Pepperoni",
  unitPrice: 12,
  ingredients: ["cheese", "pepperoni"],
  soldOut: false,
  imageUrl: "/pizza.png"
};

describe("MenuItem", () => {
  it("renders pizza details correctly", () => {
    const store = mockStore({ cart: { cart: [] } });
    render(
      <Provider store={store}>
        <MenuItem pizza={samplePizza} />
      </Provider>
    );

    expect(screen.getByText("Pepperoni")).toBeInTheDocument();
    expect(screen.getByText("cheese, pepperoni")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add pepperoni to cart/i })
    ).toBeInTheDocument();
  });

  it("dispatches addItem when button is clicked", () => {
    const store = mockStore({ cart: { cart: [] } });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <MenuItem pizza={samplePizza} />
      </Provider>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /add pepperoni to cart/i })
    );
    expect(store.dispatch).toHaveBeenCalled();
  });

  it("displays 'Sold out' if pizza is sold out", () => {
    const store = mockStore({ cart: { cart: [] } });

    render(
      <Provider store={store}>
        <MenuItem pizza={{ ...samplePizza, soldOut: true }} />
      </Provider>
    );

    expect(screen.getByText(/sold out/i)).toBeInTheDocument();
  });
});
