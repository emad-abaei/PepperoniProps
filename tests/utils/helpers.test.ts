import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatDate,
  calcMinutesLeft,
  isValidPhone
} from "../../src/utils/helpers";

describe("formatCurrency", () => {
  it("formats number to EUR currency", () => {
    expect(formatCurrency(1234.56)).toBe("€1,234.56");
  });
});

describe("formatDate", () => {
  it("formats date string into readable format", () => {
    const dateStr = "2025-04-26T14:30:00Z"; // UTC time
    const formatted = formatDate(dateStr);
    expect(typeof formatted).toBe("string");
  });
});

describe("calcMinutesLeft", () => {
  it("calculates correct minutes left", () => {
    const now = new Date();
    const future = new Date(now.getTime() + 5 * 60000); // 5 minutes ahead
    expect(calcMinutesLeft(future.toISOString())).toBe(5);
  });

  it("returns negative if date is in the past", () => {
    const now = new Date();
    const past = new Date(now.getTime() - 10 * 60000); // 10 minutes ago
    expect(calcMinutesLeft(past.toISOString())).toBeLessThan(0);
  });
});

describe("isValidPhone", () => {
  it("validates correct phone numbers", () => {
    expect(isValidPhone("+1 234 567 890")).toBe(true);
    expect(isValidPhone("(123) 456-7890")).toBe(true);
  });

  it("invalidates wrong phone numbers", () => {
    expect(isValidPhone("abcdefg")).toBe(false);
    expect(isValidPhone("12345")).toBe(false);
  });
});
