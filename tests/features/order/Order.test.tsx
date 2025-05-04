import React from "react";
import { render, screen } from "@testing-library/react";
import Order from "../../../src/features/order/Order";
import { vi } from "vitest";
import type { Mock } from "vitest";

// Mocks
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useFetcher: vi.fn()
  };
});

vi.mock("../../../src/features/order/OrderItem", () => ({
  default: () => <li>Mocked Order Item</li>
}));

vi.mock("../../../src/features/order/UpdateOrder", () => ({
  default: () => <div>Mocked UpdateOrder</div>
}));

import { useLoaderData, useFetcher } from "react-router";

describe("Order", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders order details correctly", () => {
    (useLoaderData as Mock).mockReturnValue({
      id: 42,
      status: "preparing",
      priority: true,
      priorityPrice: 5,
      orderPrice: 25,
      estimatedDelivery: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
      cart: [
        {
          pizzaId: 1,
          name: "Pepperoni",
          quantity: 1,
          totalPrice: 25,
          unitPrice: 25,
          imageUrl: "",
          ingredients: ["pepperoni"],
          soldOut: false
        }
      ]
    });

    (useFetcher as Mock).mockReturnValue({
      state: "idle",
      data: [
        {
          pizzaId: 1,
          ingredients: ["pepperoni"]
        }
      ],
      load: vi.fn()
    });

    render(<Order />);

    expect(screen.getByText(/order #42 status/i)).toBeInTheDocument();
    expect(screen.getByText(/preparing order/i)).toBeInTheDocument();
    expect(screen.getByText(/only 15 minutes left/i)).toBeInTheDocument();
    expect(screen.getByText(/mocked order item/i)).toBeInTheDocument();
    expect(screen.getByText(/price pizza: €25.00/i)).toBeInTheDocument();
    expect(screen.getByText(/price priority: €5.00/i)).toBeInTheDocument();
    expect(screen.getByText(/to pay on delivery: €30.00/i)).toBeInTheDocument();
    expect(screen.queryByText(/mocked updateorder/i)).not.toBeInTheDocument(); // Because priority is true
  });

  test("renders UpdateOrder component when not priority", () => {
    (useLoaderData as Mock).mockReturnValue({
      id: 43,
      status: "preparing",
      priority: false,
      priorityPrice: 0,
      orderPrice: 20,
      estimatedDelivery: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
      cart: []
    });

    (useFetcher as Mock).mockReturnValue({
      state: "idle",
      data: [],
      load: vi.fn()
    });

    render(<Order />);

    expect(screen.getByText(/mocked updateorder/i)).toBeInTheDocument();
  });
});
