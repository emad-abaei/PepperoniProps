import { describe, it, vi, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";
import DeleteItem from "./DeleteItem";
import * as cartSlice from "./cartSlice";

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
