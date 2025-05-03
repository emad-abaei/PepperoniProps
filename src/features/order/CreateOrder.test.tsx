import { render, screen } from "@testing-library/react";
import { useSelector } from "react-redux";
import { vi, type Mock } from "vitest";
import CreateOrder from "./CreateOrder";
import userEvent from "@testing-library/user-event";
import { PRIORITY_RATE } from "../../utils/constants";

// Mock react-redux
vi.mock("react-redux", async () => {
  const actual = await vi.importActual("react-redux");
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: () => vi.fn()
  };
});

// Mock react-router
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    Form: ({ children }: { children: React.ReactNode }) => (
      <form>{children}</form>
    ),
    useNavigation: () => ({ state: "idle" }),
    useActionData: () => ({ phone: "Enter a valid phone number, please." })
  };
});

describe("CreateOrder", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockUseSelector = useSelector as unknown as Mock;

  test("renders form with user name and order price", () => {
    const mockCart = [
      {
        pizzaId: 1,
        name: "Margherita",
        quantity: 2,
        totalPrice: 20,
        unitPrice: 10,
        soldOut: false
      }
    ];

    mockUseSelector.mockImplementation((selectorFn) => {
      return selectorFn({
        user: {
          username: "Alice",
          status: "idle",
          address: "123 Main St",
          position: { latitude: 0, longitude: 0 },
          error: ""
        },
        cart: {
          cart: mockCart
        }
      });
    });

    render(<CreateOrder />);

    // Check for heading and customer name input
    expect(
      screen.getByRole("heading", { name: /ready to order/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toHaveValue("Alice");

    // Check total price
    const totalPrice = 20;
    expect(
      screen.getByRole("button", {
        name: `Order now for €${totalPrice.toFixed(2)}`
      })
    ).toBeInTheDocument();
  });

  test("shows error message when phone number is invalid", () => {
    const mockCart = [
      {
        pizzaId: 1,
        name: "Margherita",
        quantity: 2,
        totalPrice: 20,
        unitPrice: 10,
        soldOut: false
      }
    ];

    mockUseSelector.mockImplementation((selectorFn) => {
      return selectorFn({
        user: {
          username: "Alice",
          status: "idle",
          address: "123 Main St",
          position: { latitude: 0, longitude: 0 },
          error: ""
        },
        cart: {
          cart: mockCart
        }
      });
    });

    render(<CreateOrder />);
    expect(screen.getByText(/enter a valid phone number/i)).toBeInTheDocument();
  });

  test("shows error message when phone number is invalid", () => {
    // Use the same useSelector mock setup as before...

    render(<CreateOrder />);
    expect(screen.getByText(/enter a valid phone number/i)).toBeInTheDocument();
  });

  test("updates price when priority checkbox is checked", async () => {
    const user = userEvent.setup();

    const mockCart = [
      {
        pizzaId: 1,
        name: "Pepperoni",
        quantity: 1,
        unitPrice: 10,
        totalPrice: 10
      }
    ];

    mockUseSelector.mockImplementation((selectorFn) =>
      selectorFn({
        user: {
          username: "Bob",
          status: "idle",
          address: "123 St",
          position: { latitude: 0, longitude: 0 },
          error: ""
        },
        cart: { cart: mockCart }
      })
    );

    render(<CreateOrder />);
    const checkbox = screen.getByLabelText(/give your order priority/i);
    await user.click(checkbox);

    const expectedPrice = 10 + 10 * PRIORITY_RATE;
    expect(
      screen.getByRole("button", {
        name: `Order now for €${expectedPrice.toFixed(2)}`
      })
    ).toBeInTheDocument();
  });
});
