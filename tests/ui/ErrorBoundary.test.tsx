import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import ErrorFallback from "../../src/ui/ErrorBoundary";

describe("ErrorFallback", () => {
  it("displays the error message and retry button", () => {
    const mockReset = vi.fn();
    const mockError = new Error("Something broke");

    render(<ErrorFallback error={mockError} resetErrorBoundary={mockReset} />);

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(mockError.message)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalled();
  });
});
