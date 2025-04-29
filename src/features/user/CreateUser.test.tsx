import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../store";

// Partial mock for react-router
vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");

  return {
    ...actual,
    useNavigate: vi.fn(() => vi.fn()) // mock useNavigate only
  };
});

// Partial mock for react-redux
vi.mock("react-redux", async () => {
  const actual =
    await vi.importActual<typeof import("react-redux")>("react-redux");

  return {
    ...actual,
    useDispatch: vi.fn(() => vi.fn()) // mock useDispatch only
  };
});

import { MemoryRouter } from "react-router";
import CreateUser from "./CreateUser";

describe("CreateUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders input and doesn't show button initially", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateUser />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByPlaceholderText("Your full name")).toBeInTheDocument();
    expect(screen.queryByText("Start ordering")).not.toBeInTheDocument();
  });

  it("shows button when user types a name", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CreateUser />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Your full name"), {
      target: { value: "Emad" }
    });

    expect(screen.getByText("Start ordering")).toBeInTheDocument();
  });
});
