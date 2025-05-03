import { render, screen } from "@testing-library/react";
import AppLayout from "./AppLayout";
import { useNavigation } from "react-router";
import { vi, type Mock } from "vitest";

vi.mock("react-router", async () => {
  const actual =
    await vi.importActual<typeof import("react-router")>("react-router");
  return {
    ...actual,
    useNavigation: vi.fn(),
    Outlet: () => <div>Mocked Outlet</div>
  };
});

vi.mock("./Header", () => ({
  default: () => <header>Mocked Header</header>
}));

vi.mock("./Loader", () => ({
  default: () => <div>Mocked Loader</div>
}));

vi.mock("../features/cart/CartOverview", () => ({
  default: () => <footer>Mocked CartOverview</footer>
}));

describe("AppLayout", () => {
  it("renders all layout components", () => {
    (useNavigation as Mock).mockReturnValue({ state: "idle" });

    render(<AppLayout />);
    expect(screen.getByText(/mocked header/i)).toBeInTheDocument();
    expect(screen.getByText(/mocked outlet/i)).toBeInTheDocument();
    expect(screen.getByText(/mocked cartoverview/i)).toBeInTheDocument();
  });

  it("renders Loader when navigation is loading", () => {
    (useNavigation as Mock).mockReturnValue({ state: "loading" });

    render(<AppLayout />);
    expect(screen.getByText(/mocked loader/i)).toBeInTheDocument();
  });
});
