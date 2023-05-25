import Notification from "@/store/notification/Notification";
import NotificationType from "@/store/notification/NotificationType";

export default class AuthFailedNotification implements Notification {
    labels: string[] = [];
    title: string;
    type: NotificationType;
    visible: boolean;

    constructor() {
        this.title = "Authentication failed."
        this.labels[0] = "Failed to login."
        this.type = NotificationType.RED;
        this.visible = true;
    }

    onClick(): void {
    }

}