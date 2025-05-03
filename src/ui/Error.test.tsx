import { render, screen } from "@testing-library/react";
import Error from "./Error";
import { vi } from "vitest";
import { useRouteError } from "react-router";
import { MemoryRouter } from "react-router";

// Mock react-router
vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useRouteError: vi.fn(),
    useNavigate: vi.fn()
  };
});

// Typecast the mock properly
const mockedUseRouteError = useRouteError as jest.Mock;

describe("Error", () => {
  it("renders Response error with status and statusText", () => {
    mockedUseRouteError.mockReturnValue(
      new Response(null, { status: 404, statusText: "Not Found" })
    );

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(screen.getByText(/404/)).toBeInTheDocument();
    expect(screen.getByText(/Not Found/)).toBeInTheDocument();
  });

  it("renders generic Error with message", () => {
    mockedUseRouteError.mockReturnValue(
      new globalThis.Error("Something went wrong")
    );

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(
      screen.getByText((content) => content.includes("Something went wrong"))
    ).toBeInTheDocument();
  });

  it("renders fallback UI for unknown error", () => {
    mockedUseRouteError.mockReturnValue("unexpected");

    render(
      <MemoryRouter>
        <Error />
      </MemoryRouter>
    );

    expect(screen.getByText(/An unknown error occurred/i)).toBeInTheDocument();
  });
});
