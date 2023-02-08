import type { AppNotification } from "../Models/Notification";
import { notifications } from "../stores";


const randomString = () => (Math.random() * 1000).toString();

const defaultNotificationSetting: AppNotification = {
    text: '',
    id: '',
    type: 'tip',
    dismissTimeoutMs: 3000
}

export class NotificationService {
    /**
     * Add a tip notification to the notifications store.
     * @param text The text of the notification
     * @returns The id of the notification.
     */
    public static tip(text: string): string {
        const id = randomString();
        notifications.set({ ...defaultNotificationSetting, id: id, text: text, type: 'tip'})

        return id;
    }
}