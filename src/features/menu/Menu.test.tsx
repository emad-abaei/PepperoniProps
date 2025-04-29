import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import store from "../../store";
import Menu from "./Menu";
import { useLoaderData } from "react-router";
import { Provider } from "react-redux";

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
    (useLoaderData as vi.Mock).mockReturnValue(mockPizzas);

    render(
      <Provider store={store}>
        <Menu />
      </Provider>
    );

    expect(screen.getByText("Margherita")).toBeInTheDocument();
  });
});
