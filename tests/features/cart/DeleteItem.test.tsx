import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi, expect } from "vitest";
import store from "../../../src/store";
import * as cartSlice from "../../../src/features/cart/cartSlice";
import DeleteItem from "../../../src/features/cart/DeleteItem";

describe("DeleteItem", () => {
  it("dispatches deleteItem when clicked", () => {
    const dispatchSpy = vi.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <DeleteItem pizzaId={1} />
      </Provider>
    );

    const button = screen.getByRole("button", { name: "Delete" });

    fireEvent.click(button);

    expect(dispatchSpy).toHaveBeenCalledWith(cartSlice.deleteItem(1));
  });
});
