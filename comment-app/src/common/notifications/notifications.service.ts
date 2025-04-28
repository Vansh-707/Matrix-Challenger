import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  async notifyUser(userId: number, message: string): Promise<void> {
    // Pseudo-code for sending a notification
    console.log(`Notification sent to user ${userId}: ${message}`);
  }
}