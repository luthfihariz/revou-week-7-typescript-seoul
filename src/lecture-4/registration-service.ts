import { NotificationService } from "./notification-service";

export interface RegisterResult {
  success: boolean;
  message: string;
}

export class RegistrationService {
  private registeredEmails: Set<string> = new Set();

  constructor(private notifier: NotificationService) {}

  register(email: string, password: string): RegisterResult {
    if (!email.includes("@")) {
      return { success: false, message: "Invalid email address" };
    }

    if (password.length < 8) {
      return { success: false, message: "Password must be at least 8 characters" };
    }

    if (this.registeredEmails.has(email)) {
      return { success: false, message: "Email already registered" };
    }

    this.registeredEmails.add(email);

    this.notifier.send(
      email,
      "Welcome to RevoU!",
      "Your account has been created successfully."
    );

    return { success: true, message: "Registration successful" };
  }
}
