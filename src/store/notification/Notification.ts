import NotificationType from "@/store/notification/NotificationType";

interface Notification {
    visible: boolean;
    title: string;
    labels: string[];
    type: NotificationType;
    onClick(): void;
}

export default Notification;