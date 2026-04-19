/**
 * Lecture Day 4 - Demo: Mock Functions
 *
 * jest.fn() creates a mock function that:
 *   - records how many times it was called
 *   - records what arguments it was called with
 *   - can return a controlled value
 *
 * This lets us test that our code calls its dependencies
 * correctly — without actually sending emails.
 *
 * Run: npx jest tests/registration-service.test.ts
 */

import { RegistrationService } from "../src/day4/registration-service";
import { NotificationService } from "../src/day4/notification-service";

// ─── Build a mock NotificationService using jest.fn() ────────────────────────
// Instead of a real email sender, we create an object whose send method
// is a jest mock function — it does nothing but records every call.
function createMockNotifier(): jest.Mocked<NotificationService> {
  return { send: jest.fn() };
}

describe("RegistrationService", () => {
  let service: RegistrationService;
  let mockNotifier: jest.Mocked<NotificationService>;

  beforeEach(() => {
    mockNotifier = createMockNotifier();
    service = new RegistrationService(mockNotifier);
  });

  // ─── Successful registration ───────────────────────────────────────────
  describe("register — happy path", () => {
    test("returns success for valid email and password", () => {
      const result = service.register("student@revou.co", "securepass");

      expect(result.success).toBe(true);
      expect(result.message).toBe("Registration successful");
    });

    // Mock assertion: was the notifier called?
    test("sends a welcome notification after successful registration", () => {
      service.register("student@revou.co", "securepass");

      // Verify the mock was called exactly once
      expect(mockNotifier.send).toHaveBeenCalledTimes(1);
    });

    // Mock assertion: what arguments was it called with?
    test("sends the notification to the registered email address", () => {
      service.register("student@revou.co", "securepass");

      expect(mockNotifier.send).toHaveBeenCalledWith(
        "student@revou.co",
        "Welcome to RevoU!",
        "Your account has been created successfully."
      );
    });
  });

  // ─── Failed registration ───────────────────────────────────────────────
  describe("register — validation failures", () => {
    test("rejects an email without @ symbol", () => {
      const result = service.register("notanemail", "securepass");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid email address");
    });

    test("rejects a password shorter than 8 characters", () => {
      const result = service.register("student@revou.co", "short");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Password must be at least 8 characters");
    });

    test("rejects a duplicate email", () => {
      service.register("student@revou.co", "securepass");
      const result = service.register("student@revou.co", "anotherpass");

      expect(result.success).toBe(false);
      expect(result.message).toBe("Email already registered");
    });

    // Mock assertion: notification must NOT be sent on failure
    test("does not send a notification when registration fails", () => {
      service.register("notanemail", "securepass");

      expect(mockNotifier.send).not.toHaveBeenCalled();
    });

    test("sends notification only once even after a duplicate attempt", () => {
      service.register("student@revou.co", "securepass");
      service.register("student@revou.co", "securepass"); // duplicate — should fail

      expect(mockNotifier.send).toHaveBeenCalledTimes(1);
    });
  });
});
