/**
 * Lecture Day 4 - Demo: Behavior-Driven Development (BDD)
 *
 * BDD uses a Given / When / Then structure to describe behavior
 * from the end user's perspective.
 *
 * Run: npx jest tests/user-service.test.ts
 */

import { UserService } from "../src/day4/user-service";

describe("Feature: User Login", () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  // ─── Scenario: Successful login ───────────────────────────────────────────
  describe("Scenario: Successful login with valid credentials", () => {
    test("should redirect to dashboard", () => {
      // Given a user with username "johndoe" and password "password123" exists
      // When the user attempts to log in with the correct credentials
      const result = service.login("johndoe", "password123");

      // Then the user should be redirected to the dashboard
      expect(result.success).toBe(true);
      expect(result.redirectTo).toBe("/dashboard");
      expect(result.message).toBe("Login successful");
    });
  });

  // ─── Scenario: Failed login — wrong password ──────────────────────────────
  describe("Scenario: Failed login with invalid credentials", () => {
    test("should return an error message for wrong password", () => {
      // Given a user with username "johndoe" exists
      // When the user attempts to log in with username "johndoe" and "wrongpassword"
      const result = service.login("johndoe", "wrongpassword");

      // Then the user should see an error message
      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid username or password");
      expect(result.redirectTo).toBeUndefined();
    });

    test("should return an error message for unknown username", () => {
      // Given no user with username "unknown" exists
      const result = service.login("unknown", "password123");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid username or password");
    });
  });
});

describe("Feature: User Registration", () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  describe("Scenario: Successful registration", () => {
    test("should register a new user with valid credentials", () => {
      // Given a username that does not exist yet
      // When the user registers with a strong password
      const result = service.register("newuser", "strongpass99");

      // Then registration should succeed
      expect(result.success).toBe(true);
      expect(result.message).toBe("Registration successful");
    });

    test("should allow the newly registered user to log in", () => {
      service.register("newuser", "strongpass99");
      const result = service.login("newuser", "strongpass99");

      expect(result.success).toBe(true);
      expect(result.redirectTo).toBe("/dashboard");
    });
  });

  describe("Scenario: Failed registration", () => {
    test("should reject registration when username is already taken", () => {
      // Given "johndoe" already exists
      const result = service.register("johndoe", "anotherpass");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Username already taken");
    });

    // Boundary check: password length must be >= 8
    test("should reject a password shorter than 8 characters", () => {
      const result = service.register("newuser", "short");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Password must be at least 8 characters");
    });
  });
});
