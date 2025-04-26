import { describe, it, expect } from "vitest";
import cartReducer, {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  getTotalCartQuantity,
  getTotalCartPrice,
  getCurrentQuantityById
} from "./cartSlice";
import { CartStateType, CartItemType } from "../../types";

const initialState: CartStateType = { cart: [] };

const sampleItem: CartItemType = {
  pizzaId: 1,
  name: "Pepperoni",
  quantity: 1,
  unitPrice: 10,
  totalPrice: 10
};

describe("cartSlice", () => {
  it("should return the initial state", () => {
    expect(cartReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle addItem", () => {
    const nextState = cartReducer(initialState, addItem(sampleItem));
    expect(nextState.cart).toHaveLength(1);
    expect(nextState.cart[0]).toEqual(sampleItem);
  });

  it("should handle deleteItem", () => {
    const startState = { cart: [sampleItem] };
    const nextState = cartReducer(startState, deleteItem(sampleItem.pizzaId));
    expect(nextState.cart).toHaveLength(0);
  });

  it("should handle increaseItemQuantity", () => {
    const startState = { cart: [sampleItem] };
    const nextState = cartReducer(
      startState,
      increaseItemQuantity(sampleItem.pizzaId)
    );
    expect(nextState.cart[0].quantity).toBe(2);
    expect(nextState.cart[0].totalPrice).toBe(20);
  });

  it("should handle decreaseItemQuantity", () => {
    const startState = {
      cart: [{ ...sampleItem, quantity: 2, totalPrice: 20 }]
    };
    const nextState = cartReducer(
      startState,
      decreaseItemQuantity(sampleItem.pizzaId)
    );
    expect(nextState.cart[0].quantity).toBe(1);
    expect(nextState.cart[0].totalPrice).toBe(10);
  });

  it("should remove item if quantity is 0 when decreasing", () => {
    const startState = {
      cart: [{ ...sampleItem, quantity: 1, totalPrice: 10 }]
    };
    const nextState = cartReducer(
      startState,
      decreaseItemQuantity(sampleItem.pizzaId)
    );
    expect(nextState.cart).toHaveLength(0);
  });

  it("should handle clearCart", () => {
    const startState = { cart: [sampleItem] };
    const nextState = cartReducer(startState, clearCart());
    expect(nextState.cart).toHaveLength(0);
  });
});

describe("cart selectors", () => {
  const mockState = {
    cart: {
      cart: [
        {
          pizzaId: 1,
          name: "Pepperoni",
          quantity: 2,
          unitPrice: 10,
          totalPrice: 20
        },
        { pizzaId: 2, name: "Veggie", quantity: 1, unitPrice: 8, totalPrice: 8 }
      ]
    }
  };

  it("should get total cart quantity", () => {
    expect(getTotalCartQuantity(mockState as any)).toBe(3);
  });

  it("should get total cart price", () => {
    expect(getTotalCartPrice(mockState as any)).toBe(28);
  });

  it("should get current quantity by id", () => {
    expect(getCurrentQuantityById(1)(mockState as any)).toBe(2);
    expect(getCurrentQuantityById(2)(mockState as any)).toBe(1);
    expect(getCurrentQuantityById(3)(mockState as any)).toBe(0); // Not existing
  });
});
