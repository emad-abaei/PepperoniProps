import { it, expect, vi, beforeEach, beforeAll } from "vitest";
import { fetchAddress } from "../../../src/features/user/userSlice";
import { getAddress } from "../../../src/services/apiGeocoding";

// Mock the getAddress API
vi.mock("../../../src/services/apiGeocoding", () => ({
  getAddress: vi.fn()
}));

beforeAll(() => {
  (global as any).navigator = {
    geolocation: {
      getCurrentPosition: vi.fn()
    }
  };
});

function mockGeolocation(
  successImpl?: PositionCallback,
  errorImpl?: PositionErrorCallback
) {
  if (!global.navigator.geolocation) {
    (global.navigator as any).geolocation = {
      getCurrentPosition: vi.fn()
    };
  }

  (global.navigator.geolocation.getCurrentPosition as any) = vi.fn(() => {
    if (successImpl)
      successImpl({
        coords: { latitude: 0, longitude: 0 }
      } as GeolocationPosition);
    if (errorImpl) errorImpl(new Error("User denied Geolocation") as any);
  });
}

beforeEach(() => {
  (navigator.geolocation.getCurrentPosition as any) = vi
    .fn()
    .mockImplementation((success) => {
      success({
        coords: {
          latitude: 40.7128,
          longitude: -74.006
        }
      });
    });

  (
    getAddress as unknown as { mockResolvedValue: (value: any) => void }
  ).mockResolvedValue({
    locality: "Manhattan",
    city: "New York",
    postcode: "10001",
    countryName: "USA"
  });
});

it("should fetch address successfully", async () => {
  const dispatch = vi.fn();
  const getState = vi.fn();
  const thunk = fetchAddress();

  const result = await thunk(dispatch, getState, undefined);
  const typedPayload = result.payload as {
    address: string;
    position: { latitude: number; longitude: number };
  };

  expect(result.meta.requestStatus).toBe("fulfilled");
  expect(typedPayload.address).toContain("Manhattan");
  expect(typedPayload.position.latitude).toBe(40.7128);
});

it("should handle geolocation errors", async () => {
  mockGeolocation(undefined, () => {
    throw new Error("User denied Geolocation");
  });

  const dispatch = vi.fn();
  const getState = vi.fn();
  const thunk = fetchAddress();

  const result = await thunk(dispatch, getState, undefined);

  expect(result.meta.requestStatus).toBe("rejected");
  expect(result.payload).toMatch(/User denied/);
});
