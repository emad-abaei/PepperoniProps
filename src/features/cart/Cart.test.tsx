import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Cart from "./Cart";
import * as reactRedux from "react-redux";
import { MemoryRouter } from "react-router";

vi.mock("react-redux", async () => {
  const actual =
    await vi.importActual<typeof import("react-redux")>("react-redux");
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn()
  };
});

vi.mock("./EmptyCart", () => ({
  default: () => <div>EmptyCartMock</div>
}));

vi.mock("./CartItem", () => ({
  default: () => <div>CartItemMock Veggie Pizza</div>
}));

describe("Cart", () => {
  const mockDispatch = vi.fn();
  vi.spyOn(reactRedux, "useDispatch").mockReturnValue(mockDispatch);

  it("renders EmptyCart when cart is empty", () => {
    vi.spyOn(reactRedux, "useSelector").mockImplementation((selector: any) => {
      return selector({
        user: { username: "Alex" },
        cart: { cart: [] }
      });
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    expect(screen.getByText("EmptyCartMock")).toBeInTheDocument();
  });

  it("renders cart items and handles clearCart dispatch", () => {
    vi.spyOn(reactRedux, "useSelector").mockImplementation((selector: any) => {
      return selector({
        user: { username: "Alex" },
        cart: {
          cart: [
            {
              pizzaId: 1,
              name: "Veggie Pizza",
              quantity: 1,
              unitPrice: 10,
              totalPrice: 10
            }
          ]
        }
      });
    });

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
    expect(screen.getByText("Your cart, Alex")).toBeInTheDocument();
    expect(screen.getByText("CartItemMock Veggie Pizza")).toBeInTheDocument();

    const clearButton = screen.getByRole("button", { name: /clear cart/i });
    fireEvent.click(clearButton);
    expect(mockDispatch).toHaveBeenCalled();
  });
});
