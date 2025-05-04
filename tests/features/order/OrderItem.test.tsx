import React from "react";
import { render, screen } from "@testing-library/react";
import OrderItem from "../../../src/features/order/OrderItem";
import { formatCurrency } from "../../../src/utils/helpers";
import { OrderedPizzaType } from "../../../src/types";

describe("OrderItem", () => {
  const mockItem: OrderedPizzaType = {
    pizzaId: 1,
    name: "Margherita",
    quantity: 2,
    totalPrice: 22,
    unitPrice: 11,
    imageUrl: "/images/margherita.jpg",
    ingredients: ["cheese", "basil"],
    soldOut: false
  };

  test("renders name, quantity, and total price", () => {
    render(
      <OrderItem
        item={mockItem}
        ingredients={["cheese", "basil"]}
        isLoadingIngredients={false}
      />
    );

    // Check that the quantity is shown
    expect(screen.getByText(/2×/i)).toBeInTheDocument();

    // Check that the name is shown
    expect(screen.getByText(/margherita/i)).toBeInTheDocument();

    // Check that the price is shown
    expect(screen.getByText(formatCurrency(22))).toBeInTheDocument();
  });

  test("displays loading message when ingredients are loading", () => {
    render(
      <OrderItem item={mockItem} ingredients={[]} isLoadingIngredients={true} />
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("renders ingredients list when not loading", () => {
    render(
      <OrderItem
        item={mockItem}
        ingredients={["cheese", "tomato", "basil"]}
        isLoadingIngredients={false}
      />
    );

    expect(screen.getByText(/cheese, tomato, basil/i)).toBeInTheDocument();
  });
});
