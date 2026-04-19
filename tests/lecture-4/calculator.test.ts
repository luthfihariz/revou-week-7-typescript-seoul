/**
 * Lecture Day 4 - Demo: Test-Driven Development (TDD)
 *
 * TDD Flow:
 *   1. Write a failing test (Red)
 *   2. Write the minimum code to make it pass (Green)
 *   3. Refactor while keeping tests green (Refactor)
 *
 * Run: npx jest tests/calculator.test.ts
 */

import { Calculator } from "../../src/lecture-4/calculator";

// ─── Jest Lifecycle ──────────────────────────────────────────────────────────
// beforeAll runs once before all tests in this suite
beforeAll(() => {
  console.log("Starting Calculator test suite...");
});

// afterAll runs once after all tests in this suite complete
afterAll(() => {
  console.log("Calculator test suite complete.");
});

// ─── Test Suite ───────────────────────────────────────────────────────────────
// describe groups related tests into a Test Suite
describe("Calculator", () => {
  let calc: Calculator;

  // beforeEach creates a fresh Calculator before every test (Isolation)
  beforeEach(() => {
    calc = new Calculator();
  });

  // ─── add ─────────────────────────────────────────────────────────────────
  describe("add", () => {
    test("should return the sum of two positive numbers", () => {
      expect(calc.add(2, 3)).toBe(5);
    });

    test("should return the correct sum when adding negative numbers", () => {
      expect(calc.add(-1, -4)).toBe(-5);
    });

    test("should return the original number when adding zero", () => {
      expect(calc.add(7, 0)).toBe(7);
    });
  });

  // ─── subtract ────────────────────────────────────────────────────────────
  describe("subtract", () => {
    test("should return the difference of two numbers", () => {
      expect(calc.subtract(10, 4)).toBe(6);
    });

    test("should return a negative result when subtrahend is larger", () => {
      expect(calc.subtract(3, 8)).toBe(-5);
    });
  });

  // ─── multiply ────────────────────────────────────────────────────────────
  describe("multiply", () => {
    test("should return the product of two numbers", () => {
      expect(calc.multiply(3, 4)).toBe(12);
    });

    test("should return zero when multiplying by zero", () => {
      expect(calc.multiply(9, 0)).toBe(0);
    });

    test("should return a positive result when multiplying two negatives", () => {
      expect(calc.multiply(-3, -4)).toBe(12);
    });
  });

  // ─── divide ──────────────────────────────────────────────────────────────
  describe("divide", () => {
    test("should return the correct quotient", () => {
      expect(calc.divide(10, 2)).toBe(5);
    });

    // Error handling check: what happens on invalid input?
    test("should throw an error when dividing by zero", () => {
      expect(() => calc.divide(10, 0)).toThrow("Cannot divide by zero");
    });

    test("should handle decimal results", () => {
      expect(calc.divide(1, 3)).toBeCloseTo(0.333, 2);
    });
  });
});
