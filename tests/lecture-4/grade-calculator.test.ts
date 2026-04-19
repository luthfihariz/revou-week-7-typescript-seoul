/**
 * Lecture Day 4 - Demo: Boundary Checks + toEqual for objects
 *
 * The grade scale has clear boundaries — perfect for practising
 * boundary-check strategy: test at, just below, and just above each cutoff.
 *
 *   A: 90–100   B: 80–89   C: 70–79   D: 60–69   F: 0–59
 *
 * Run: npx jest tests/grade-calculator.test.ts
 */

import {
  calculateGrade,
  isPassing,
  evaluate,
  calculateClassAverage,
} from "../../src/lecture-4/grade-calculator";

// ─── calculateGrade ───────────────────────────────────────────────────────────
describe("calculateGrade", () => {
  // Logic checks: typical values well inside each band
  describe("typical values", () => {
    test("returns A for a score of 95", () => expect(calculateGrade(95)).toBe("A"));
    test("returns B for a score of 85", () => expect(calculateGrade(85)).toBe("B"));
    test("returns C for a score of 75", () => expect(calculateGrade(75)).toBe("C"));
    test("returns D for a score of 65", () => expect(calculateGrade(65)).toBe("D"));
    test("returns F for a score of 50", () => expect(calculateGrade(50)).toBe("F"));
  });

  // Boundary checks: exact cutoff values
  describe("boundary values", () => {
    test("returns A at exactly 90", () => expect(calculateGrade(90)).toBe("A"));
    test("returns B at exactly 89 (just below A)", () => expect(calculateGrade(89)).toBe("B"));
    test("returns B at exactly 80", () => expect(calculateGrade(80)).toBe("B"));
    test("returns C at exactly 79 (just below B)", () => expect(calculateGrade(79)).toBe("C"));
    test("returns C at exactly 70", () => expect(calculateGrade(70)).toBe("C"));
    test("returns D at exactly 69 (just below C)", () => expect(calculateGrade(69)).toBe("D"));
    test("returns D at exactly 60", () => expect(calculateGrade(60)).toBe("D"));
    test("returns F at exactly 59 (just below D)", () => expect(calculateGrade(59)).toBe("F"));
    test("returns F at exactly 0", () => expect(calculateGrade(0)).toBe("F"));
    test("returns A at exactly 100", () => expect(calculateGrade(100)).toBe("A"));
  });

  // Error handling
  describe("invalid scores", () => {
    test("throws for a score above 100", () => {
      expect(() => calculateGrade(101)).toThrow("Score must be between 0 and 100");
    });

    test("throws for a negative score", () => {
      expect(() => calculateGrade(-1)).toThrow("Score must be between 0 and 100");
    });
  });
});

// ─── isPassing ────────────────────────────────────────────────────────────────
describe("isPassing", () => {
  test("returns true for a passing score (60)", () => {
    expect(isPassing(60)).toBe(true);
  });

  test("returns false for a failing score (59)", () => {
    expect(isPassing(59)).toBe(false);
  });

  test("returns false for zero", () => {
    expect(isPassing(0)).toBe(false);
  });
});

// ─── evaluate ─────────────────────────────────────────────────────────────────
// toEqual performs deep equality on the returned object
describe("evaluate", () => {
  test("returns the correct full result object for a score of 95", () => {
    expect(evaluate(95)).toEqual({
      score: 95,
      grade: "A",
      isPassing: true,
      remark: "Excellent",
    });
  });

  test("returns the correct full result object for a failing score of 40", () => {
    expect(evaluate(40)).toEqual({
      score: 40,
      grade: "F",
      isPassing: false,
      remark: "Failing",
    });
  });

  test("returns isPassing: false for a score of 59", () => {
    expect(evaluate(59).isPassing).toBe(false);
  });

  test("returns isPassing: true for a score of 60", () => {
    expect(evaluate(60).isPassing).toBe(true);
  });
});

// ─── calculateClassAverage ────────────────────────────────────────────────────
describe("calculateClassAverage", () => {
  test("returns the correct average for a class", () => {
    expect(calculateClassAverage([80, 90, 70, 100, 60])).toBe(80);
  });

  test("handles a class of one student", () => {
    expect(calculateClassAverage([88])).toBe(88);
  });

  test("throws when given no scores", () => {
    expect(() => calculateClassAverage([])).toThrow("No scores provided");
  });
});
