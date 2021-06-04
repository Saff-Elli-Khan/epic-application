import { Request } from "express";
import { Notifications } from "../database/core/notifications";

export type NotificationTypes = "Success" | "Info" | "Warning" | "Danger";

export class Notifier {
  constructor(protected Request: Request) {}

  public send = async (
    userId: string,
    type: NotificationTypes,
    content?: {
      subject?: string;
      message?: string;
      body?: string;
    },
    href?: string
  ) => {
    // Create Notification
    await Notifications.new().insert({
      userId,
      type,
      subject: content?.subject,
      message: content?.message,
      body: content?.body,
      href,
    });

    return this;
  };
}
