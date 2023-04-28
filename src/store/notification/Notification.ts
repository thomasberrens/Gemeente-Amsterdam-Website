interface Notification {
    visible: boolean;
    title: string;
    labels: string[];
    type: string;
    onClick(): void;
}

export default Notification;