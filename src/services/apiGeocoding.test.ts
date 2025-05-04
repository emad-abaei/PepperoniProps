// src/services/apiGeocoding.test.ts
import { getAddress } from "./apiGeocoding";
import { vi } from "vitest";

describe("getAddress", () => {
  beforeEach(() => {
    vi.restoreAllMocks(); // Reset mocks between tests
  });

  it("returns address data on successful fetch", async () => {
    const mockResponse = { city: "London", country: "UK" };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockResponse)
    });

    const data = await getAddress({ latitude: 51.5, longitude: -0.1 });
    expect(data).toEqual(mockResponse);
  });

  it("throws an error on failed fetch", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false
    });

    await expect(
      getAddress({ latitude: 51.5, longitude: -0.1 })
    ).rejects.toThrow("Failed getting address");
  });
});
