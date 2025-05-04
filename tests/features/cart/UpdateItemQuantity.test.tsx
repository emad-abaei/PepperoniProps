import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UpdateItemQuantity from "../../../src/features/cart/UpdateItemQuantity";

// Mock the Redux dispatch function
const mockDispatch = vi.fn();
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useDispatch: () => mockDispatch
  };
});

describe("UpdateItemQuantity", () => {
  it("dispatches increase and decrease actions when buttons are clicked", () => {
    render(<UpdateItemQuantity pizzaId={1} currentQuantity={2} />);

    const decreaseButton = screen.getByRole("button", {
      name: /decrease quantity of pizza 1/i
    });
    const increaseButton = screen.getByRole("button", {
      name: /increase quantity of pizza 1/i
    });

    fireEvent.click(decreaseButton);
    fireEvent.click(increaseButton);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });
});
