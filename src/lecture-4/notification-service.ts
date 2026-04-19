export interface NotificationService {
  send(to: string, subject: string, body: string): void;
}

export class EmailNotificationService implements NotificationService {
  send(to: string, subject: string, body: string): void {
    console.log(`[Email] To: ${to} | Subject: ${subject} | ${body}`);
  }
}
