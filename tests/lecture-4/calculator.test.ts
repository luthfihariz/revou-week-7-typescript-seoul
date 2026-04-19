// ============================================================
// Lecture 4 — calculator.test.ts
// Demonstrates Test-Driven Development (TDD) with pure functions.
// ============================================================

import { add, subtract, multiply, divide, remainder } from "../../src/lecture-4/calculator";

describe("add", () => {
  test("returns the sum of two positive numbers", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("handles negative numbers", () => {
    expect(add(-1, 5)).toBe(4);
  });

  test("handles zero", () => {
    expect(add(0, 100)).toBe(100);
  });

  test("handles two negatives", () => {
    expect(add(-3, -7)).toBe(-10);
  });
});

describe("subtract", () => {
  test("returns the difference of two numbers", () => {
    expect(subtract(10, 3)).toBe(7);
  });

  test("returns a negative result when subtrahend is larger", () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  test("returns zero when both values are equal", () => {
    expect(subtract(5, 5)).toBe(0);
  });
});

describe("multiply", () => {
  test("returns the product of two numbers", () => {
    expect(multiply(4, 5)).toBe(20);
  });

  test("returns zero when multiplying by zero", () => {
    expect(multiply(100, 0)).toBe(0);
  });

  test("returns a positive result when multiplying two negatives", () => {
    expect(multiply(-3, -4)).toBe(12);
  });
});

describe("divide", () => {
  test("returns the correct quotient", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("throws when dividing by zero", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });

  test("handles decimal results", () => {
    expect(divide(1, 3)).toBeCloseTo(0.333);
  });
});

describe("remainder", () => {
  test("returns the remainder of division", () => {
    expect(remainder(10, 3)).toBe(1);
  });

  test("returns 0 when evenly divisible", () => {
    expect(remainder(10, 5)).toBe(0);
  });

  test("throws when dividing by zero", () => {
    expect(() => remainder(10, 0)).toThrow("Cannot divide by zero");
  });
});
