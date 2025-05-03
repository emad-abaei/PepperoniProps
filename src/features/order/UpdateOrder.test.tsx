import { render, screen } from "@testing-library/react";
import UpdateOrder from "./UpdateOrder";
import { vi } from "vitest";
import type { Mock } from "vitest";

// Mocks react-router's useFetcher
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useFetcher: vi.fn()
  };
});

import { useFetcher } from "react-router";

// Helper: Mock Form component for useFetcher
const MockForm = ({ children }: { children: React.ReactNode }) => (
  <form>{children}</form>
);

describe("UpdateOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders the form with a button", () => {
    (useFetcher as Mock).mockReturnValue({
      state: "idle",
      Form: MockForm
    });

    render(<UpdateOrder />);
    const button = screen.getByRole("button", {
      name: /make this order a priority/i
    });
    expect(button).toBeInTheDocument();
    expect(button).toBeEnabled();
  });

  test("disables the button and shows updating text while submitting", () => {
    (useFetcher as Mock).mockReturnValue({
      state: "submitting",
      Form: MockForm
    });

    render(<UpdateOrder />);

    const button = screen.getByRole("button", {
      name: /make this order a priority/i
    });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/updating/i);

    const statusText = screen.getByText(/updating order priority/i);
    expect(statusText).toBeInTheDocument();
  });
});
