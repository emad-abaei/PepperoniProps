import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router";
import cartReducer from "./cartSlice";
import CartOverview from "./CartOverview";

function renderWithStore(preloadedState: any) {
  const rootReducer = combineReducers({
    cart: cartReducer
  });

  const store = configureStore({
    reducer: rootReducer,
    preloadedState
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <CartOverview />
      </MemoryRouter>
    </Provider>
  );
}

describe("CartOverview", () => {
  it("shows correct quantity and price when cart is not empty", () => {
    renderWithStore({
      cart: {
        cart: [
          {
            pizzaId: 1,
            name: "Margherita",
            quantity: 2,
            unitPrice: 10,
            totalPrice: 20
          }
        ]
      }
    });

    expect(screen.getByText("2 pizzas")).toBeInTheDocument();
    expect(screen.getByText("Open cart →")).toBeInTheDocument();
    expect(screen.getByText(/\$?20(\.00)?/)).toBeInTheDocument();
  });

  it("renders nothing when cart is empty", () => {
    const { container } = renderWithStore({
      cart: { cart: [] }
    });

    expect(container).toBeEmptyDOMElement();
  });
});
