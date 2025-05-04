import React from "react";
import { useNavigate } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi, type Mock } from "vitest";
import SearchOrder from "../../../src/features/order/SearchOrder";

// Mock useNavigate from react-router
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: vi.fn()
  };
});

describe("SearchOrder", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useNavigate as unknown as Mock).mockReturnValue(mockNavigate);
    vi.clearAllMocks();
  });

  test("renders input field", () => {
    render(<SearchOrder />);
    const input = screen.getByPlaceholderText(/search order/i);
    expect(input).toBeInTheDocument();
  });

  test("updates input value as user types", async () => {
    render(<SearchOrder />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/search order/i);

    await user.type(input, "12345");
    expect(input).toHaveValue("12345");
  });

  test("navigates to order on form submit and clears input", async () => {
    render(<SearchOrder />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/search order/i);

    await user.type(input, "98765");
    await user.keyboard("{Enter}");

    expect(mockNavigate).toHaveBeenCalledWith("/order/98765");
    expect(input).toHaveValue(""); // input should be cleared
  });

  test("does not navigate if input is empty", async () => {
    render(<SearchOrder />);
    const user = userEvent.setup();
    const input = screen.getByPlaceholderText(/search order/i);

    await user.clear(input);
    await user.keyboard("{Enter}");

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
