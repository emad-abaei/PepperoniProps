import { getMenu, getOrder, createOrder, updateOrder } from "./apiRestaurant";
import { vi } from "vitest";

describe("apiRestaurant", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("getMenu", () => {
    it("should return mapped pizza data", async () => {
      const mockApiResponse = {
        data: [
          {
            id: 1,
            imageUrl: "url",
            ingredients: ["cheese"],
            name: "Cheese",
            soldOut: false,
            unitPrice: 10
          }
        ]
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockApiResponse)
      });

      const data = await getMenu();
      expect(data[0]).toEqual({
        pizzaId: 1,
        imageUrl: "url",
        ingredients: ["cheese"],
        name: "Cheese",
        soldOut: false,
        unitPrice: 10
      });
    });

    it("should throw error if fetch fails", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false });

      await expect(getMenu()).rejects.toThrow("Failed getting menu");
    });
  });

  describe("getOrder", () => {
    it("should return order data", async () => {
      const mockOrder = { id: 1, customer: "John" };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: mockOrder })
      });

      const data = await getOrder("1");
      expect(data).toEqual(mockOrder);
    });

    it("should throw if order not found", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false });

      await expect(getOrder("999")).rejects.toThrow("Couldn't find order #999");
    });
  });

  describe("createOrder", () => {
    it("should return created order", async () => {
      const newOrder = {
        customer: "Alice",
        address: "123",
        cart: [],
        phone: "123",
        priority: false
      };
      const createdOrder = { id: 1 };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ data: createdOrder })
      });

      const data = await createOrder(newOrder);
      expect(data).toEqual(createdOrder);
    });

    it("should throw on failure", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false });

      await expect(
        createOrder({
          customer: "",
          address: "",
          cart: [],
          phone: "",
          priority: false
        })
      ).rejects.toThrow("Failed creating your order");
    });
  });

  describe("updateOrder", () => {
    it("should not throw if successful", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: true });

      await expect(
        updateOrder("1", { priority: true })
      ).resolves.toBeUndefined();
    });

    it("should throw on failure", async () => {
      global.fetch = vi.fn().mockResolvedValue({ ok: false });

      await expect(updateOrder("1", { priority: true })).rejects.toThrow(
        "Failed updating your order"
      );
    });
  });
});
