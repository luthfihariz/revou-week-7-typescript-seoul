// ============================================================
// Lecture 4 — auth.test.ts
// Tests for login and register — interfaces, optional properties.
// ============================================================

import { login, register, User } from "../../src/lecture-4/auth";

// Seed data — passed into functions so each test controls its own state
const seedUsers: User[] = [
  { username: "budi",   password: "password123" },
  { username: "siti",   password: "secret456"   },
];

describe("login", () => {
  test("returns success and redirectTo for valid credentials", () => {
    const result = login(seedUsers, "budi", "password123");
    expect(result.success).toBe(true);
    expect(result.redirectTo).toBe("/dashboard");
  });

  test("returns failure for wrong password", () => {
    const result = login(seedUsers, "budi", "wrongpassword");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid username or password");
  });

  test("returns failure for unknown username", () => {
    const result = login(seedUsers, "unknown", "password123");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Invalid username or password");
  });

  test("does not include redirectTo on failure", () => {
    const result = login(seedUsers, "budi", "wrong");
    expect(result.redirectTo).toBeUndefined();
  });
});

describe("register", () => {
  test("returns success and adds the user", () => {
    const { result, updatedUsers } = register(seedUsers, "agus", "newpassword99");
    expect(result.success).toBe(true);
    expect(updatedUsers).toHaveLength(seedUsers.length + 1);
  });

  test("new user can log in after registering", () => {
    const { updatedUsers } = register(seedUsers, "agus", "newpassword99");
    const loginResult = login(updatedUsers, "agus", "newpassword99");
    expect(loginResult.success).toBe(true);
  });

  test("returns failure when username is already taken", () => {
    const { result, updatedUsers } = register(seedUsers, "budi", "anotherpass");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Username already taken");
    expect(updatedUsers).toHaveLength(seedUsers.length);
  });

  test("returns failure when password is shorter than 8 characters", () => {
    const { result } = register(seedUsers, "newuser", "short");
    expect(result.success).toBe(false);
    expect(result.message).toBe("Password must be at least 8 characters");
  });

  test("does not mutate the original user list on failure", () => {
    register(seedUsers, "budi", "duplicate");
    expect(seedUsers).toHaveLength(2);
  });
});
