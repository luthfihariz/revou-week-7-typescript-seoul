export interface User {
  username: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  message: string;
  redirectTo?: string;
}

export class UserService {
  private users: User[] = [
    { username: "johndoe", password: "password123" },
    { username: "janedoe", password: "secret456" },
  ];

  login(username: string, password: string): LoginResult {
    const user = this.users.find((u) => u.username === username);

    if (!user) {
      return { success: false, message: "Invalid username or password" };
    }

    if (user.password !== password) {
      return { success: false, message: "Invalid username or password" };
    }

    return {
      success: true,
      message: "Login successful",
      redirectTo: "/dashboard",
    };
  }

  register(username: string, password: string): LoginResult {
    const exists = this.users.some((u) => u.username === username);

    if (exists) {
      return { success: false, message: "Username already taken" };
    }

    if (password.length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters",
      };
    }

    this.users.push({ username, password });
    return { success: true, message: "Registration successful" };
  }
}
