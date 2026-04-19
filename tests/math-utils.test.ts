/**
 * Lecture Day 4 - Demo: Unit Testing Strategies
 *
 * Strategies covered:
 *   - Logic checks  : correct calculations on valid input
 *   - Boundary checks: typical, edge, and invalid inputs
 *   - Error handling : how the system responds to bad input
 *
 * Run: npx jest tests/math-utils.test.ts
 */

import { clamp, isInRange, factorial, average } from "../src/day4/math-utils";

// ─── isInRange ────────────────────────────────────────────────────────────────
// The slide example: expected range 3–7
//   Typical: 5 → true
//   Edge:    3 or 7 → true (boundary values)
//   Invalid: 9 → false
describe("isInRange", () => {
  // Logic check
  test("returns true for a typical value inside the range (5)", () => {
    expect(isInRange(5, 3, 7)).toBe(true);
  });

  // Boundary checks
  test("returns true for the lower boundary value (3)", () => {
    expect(isInRange(3, 3, 7)).toBe(true);
  });

  test("returns true for the upper boundary value (7)", () => {
    expect(isInRange(7, 3, 7)).toBe(true);
  });

  // Invalid input
  test("returns false for a value outside the range (9)", () => {
    expect(isInRange(9, 3, 7)).toBe(false);
  });

  test("returns false for a value below the range (1)", () => {
    expect(isInRange(1, 3, 7)).toBe(false);
  });
});

// ─── clamp ────────────────────────────────────────────────────────────────────
describe("clamp", () => {
  // Logic check: value already within range is returned as-is
  test("returns the value unchanged when it is within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  // Boundary checks
  test("returns min when value is below range", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  test("returns max when value is above range", () => {
    expect(clamp(15, 0, 10)).toBe(10);
  });

  test("returns value at exactly min boundary", () => {
    expect(clamp(0, 0, 10)).toBe(0);
  });

  test("returns value at exactly max boundary", () => {
    expect(clamp(10, 0, 10)).toBe(10);
  });

  // Error handling
  test("throws when min is greater than max", () => {
    expect(() => clamp(5, 10, 0)).toThrow("min cannot be greater than max");
  });
});

// ─── factorial ────────────────────────────────────────────────────────────────
describe("factorial", () => {
  // Logic checks
  test("returns 1 for factorial of 0", () => {
    expect(factorial(0)).toBe(1);
  });

  test("returns 1 for factorial of 1", () => {
    expect(factorial(1)).toBe(1);
  });

  test("returns 120 for factorial of 5", () => {
    expect(factorial(5)).toBe(120);
  });

  // Error handling
  test("throws for a negative number", () => {
    expect(() => factorial(-1)).toThrow(
      "factorial is not defined for negative numbers"
    );
  });

  test("throws for a non-integer input", () => {
    expect(() => factorial(2.5)).toThrow("factorial requires an integer");
  });
});

// ─── average ─────────────────────────────────────────────────────────────────
describe("average", () => {
  // Logic check
  test("returns the correct average of a number array", () => {
    expect(average([1, 2, 3, 4, 5])).toBe(3);
  });

  // Boundary check: single element
  test("returns the value itself for a single-element array", () => {
    expect(average([42])).toBe(42);
  });

  // Error handling: empty array
  test("throws when given an empty array", () => {
    expect(() => average([])).toThrow(
      "Cannot compute average of empty array"
    );
  });
});
