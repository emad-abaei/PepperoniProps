import React from "react";
import { Provider } from "react-redux";
import { useLoaderData } from "react-router";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import store from "../../../src/store";
import Menu from "../../../src/features/menu/Menu";

vi.mock("react-router", () => ({
  useLoaderData: vi.fn()
}));

const mockPizzas = [
  {
    pizzaId: 1,
    name: "Margherita",
    unitPrice: 10,
    ingredients: ["cheese", "tomato"],
    soldOut: false,
    imageUrl: "/img/margherita.jpg"
  }
];

describe("Menu", () => {
  it("renders menu items from loader data", () => {
    (useLoaderData as ReturnType<typeof vi.fn>).mockReturnValue(mockPizzas);

    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    expect(screen.getByText("Margherita")).toBeInTheDocument();
  });
});
