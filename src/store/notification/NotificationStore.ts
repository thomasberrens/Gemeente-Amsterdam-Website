import {defineStore} from "pinia";
import Notification from "@/store/notification/Notification";
import NotificationType from "@/store/notification/NotificationType";

export const useNotificationStore = defineStore({
    id: 'notification',
    state: () => ({
        currentNotification: null as Notification | null
    }),
    actions: {
        clearNotification() {
            if (!this.currentNotification) return;
            this.currentNotification.visible = false;

            // Wait for the animation to finish before clearing the notification.
            setTimeout(() => {
                this.currentNotification = null;
            }, 500);

        },

        setNotification(notification: Notification, timeout: number = 4000) {
            this.currentNotification = notification;

            setTimeout(() => {
                this.clearNotification();
            }, timeout);
        },

    },
    getters: {
        getCurrentNotification(): Notification | null {
            return this.currentNotification;
        },
        isNotificationVisible(): boolean {
            return !!this.currentNotification && this.currentNotification.visible;
        },
        getNotificationTitle(): string | null {
            return this.currentNotification?.title || null;
        },
        getNotificationLabels(): string[] | null {
            return this.currentNotification?.labels || null;
        },
        getNotificationType(): NotificationType | null {
            return this.currentNotification?.type || null;
        }
    }
});