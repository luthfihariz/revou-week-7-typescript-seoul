// ============================================================
// Lecture 4 — auth.ts
// Login and registration — pure functions, no class.
// Uses: interfaces (L2), optional properties (L2), union types (L2).
//
// Functions receive the user list as a parameter so callers
// (and tests) control the data. No hidden global state.
// ============================================================

// ---- TYPES ------------------------------------------------

export interface User {
  username: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message: string;
  redirectTo?: string; // optional — only present on successful login
}

export interface RegisterResult {
  result: AuthResult;
  updatedUsers: User[]; // returns the new list after adding the user
}

// ---- FUNCTIONS --------------------------------------------

export function login(
  users: User[],
  username: string,
  password: string
): AuthResult {
  const user = users.find((u) => u.username === username);

  // Return the same generic message for both wrong username and wrong password.
  // Never tell the caller which one was wrong — that leaks information.
  if (!user || user.password !== password) {
    return { success: false, message: "Invalid username or password" };
  }

  return { success: true, message: "Login successful", redirectTo: "/dashboard" };
}

export function register(
  users: User[],
  username: string,
  password: string
): RegisterResult {
  if (users.some((u) => u.username === username)) {
    return {
      result: { success: false, message: "Username already taken" },
      updatedUsers: users,
    };
  }

  if (password.length < 8) {
    return {
      result: { success: false, message: "Password must be at least 8 characters" },
      updatedUsers: users,
    };
  }

  const newUser: User = { username, password };
  return {
    result: { success: true, message: "Registration successful" },
    updatedUsers: [...users, newUser],
  };
}
