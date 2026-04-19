/**
 * Lecture Day 4 - Demo: Unit Testing Strategies (String Utils)
 *
 * Strategies covered:
 *   - Logic checks       : correct transformation on valid input
 *   - Boundary checks    : empty string, exact-length, edge cases
 *   - Error handling     : invalid parameter values
 *   - Object-oriented    : pure functions with predictable state
 *
 * Run: npx jest tests/string-utils.test.ts
 */

import {
  capitalize,
  truncate,
  countWords,
  isPalindrome,
  reverseWords,
} from "../src/day4/string-utils";

// ─── capitalize ───────────────────────────────────────────────────────────────
describe("capitalize", () => {
  // Logic check
  test("capitalizes the first letter and lowercases the rest", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  test("handles an already capitalized string", () => {
    expect(capitalize("WORLD")).toBe("World");
  });

  // Boundary check: empty string
  test("returns an empty string unchanged", () => {
    expect(capitalize("")).toBe("");
  });

  // Boundary check: single character
  test("handles a single character", () => {
    expect(capitalize("a")).toBe("A");
  });
});

// ─── truncate ─────────────────────────────────────────────────────────────────
describe("truncate", () => {
  // Logic check: string longer than maxLength gets truncated
  test("truncates and appends ellipsis when string exceeds maxLength", () => {
    expect(truncate("Hello World", 5)).toBe("Hello...");
  });

  // Boundary check: string shorter than maxLength is returned as-is
  test("returns the string unchanged when it is within maxLength", () => {
    expect(truncate("Hi", 10)).toBe("Hi");
  });

  // Boundary check: string exactly at maxLength
  test("returns the string unchanged when it equals maxLength exactly", () => {
    expect(truncate("Hello", 5)).toBe("Hello");
  });

  // Boundary check: maxLength of 0
  test("returns only ellipsis when maxLength is 0", () => {
    expect(truncate("Hello", 0)).toBe("...");
  });

  // Error handling
  test("throws when maxLength is negative", () => {
    expect(() => truncate("Hello", -1)).toThrow("maxLength must be non-negative");
  });
});

// ─── countWords ───────────────────────────────────────────────────────────────
describe("countWords", () => {
  // Logic check
  test("counts words in a normal sentence", () => {
    expect(countWords("The quick brown fox")).toBe(4);
  });

  // Boundary check: single word
  test("returns 1 for a single word", () => {
    expect(countWords("Hello")).toBe(1);
  });

  // Boundary check: empty string
  test("returns 0 for an empty string", () => {
    expect(countWords("")).toBe(0);
  });

  // Boundary check: whitespace only
  test("returns 0 for a whitespace-only string", () => {
    expect(countWords("   ")).toBe(0);
  });

  // Logic check: multiple spaces between words
  test("handles multiple spaces between words correctly", () => {
    expect(countWords("hello   world")).toBe(2);
  });
});

// ─── isPalindrome ─────────────────────────────────────────────────────────────
describe("isPalindrome", () => {
  // Logic checks
  test("returns true for a simple palindrome", () => {
    expect(isPalindrome("racecar")).toBe(true);
  });

  test("returns false for a non-palindrome", () => {
    expect(isPalindrome("hello")).toBe(false);
  });

  // Boundary check: ignores casing and punctuation
  test("returns true for a palindrome sentence ignoring spaces and punctuation", () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  // Boundary check: single character is always a palindrome
  test("returns true for a single character", () => {
    expect(isPalindrome("a")).toBe(true);
  });

  // Boundary check: empty string
  test("returns true for an empty string", () => {
    expect(isPalindrome("")).toBe(true);
  });
});

// ─── reverseWords ─────────────────────────────────────────────────────────────
describe("reverseWords", () => {
  // Logic check
  test("reverses the order of words in a sentence", () => {
    expect(reverseWords("Hello World")).toBe("World Hello");
  });

  test("handles a three-word sentence", () => {
    expect(reverseWords("one two three")).toBe("three two one");
  });

  // Boundary check: single word is unchanged
  test("returns a single word unchanged", () => {
    expect(reverseWords("Hello")).toBe("Hello");
  });
});
