import React from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import userReducer from "../../../src/features/user/userSlice";
import Username from "../../../src/features/user/Username";

// A helper to render with a custom Redux state
function renderWithState(initialState: any) {
  const store = configureStore({
    reducer: { user: userReducer },
    preloadedState: { user: initialState }
  });

  return render(
    <Provider store={store}>
      <Username />
    </Provider>
  );
}

describe("Username Component", () => {
  it("renders username when user is logged in", () => {
    renderWithState({ username: "Emad" });

    expect(screen.getByText(/welcome, emad/i)).toBeInTheDocument();
  });

  it("renders nothing when no username is provided", () => {
    const { container } = renderWithState({ username: "" });

    expect(container).toBeEmptyDOMElement();
  });
});
