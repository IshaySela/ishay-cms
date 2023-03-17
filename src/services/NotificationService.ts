import type { AppNotification, NotificationTypes } from "../Models/Notification";
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
     * Add a notification to the notifications store.
     * @param text The text of the notification
     * @param type The type of the notification.
     * 
     * @returns The id of the notification.
     */
    public static generic(text: string, type: NotificationTypes) {
        const id = randomString();
        notifications.set({ ...defaultNotificationSetting, id: id, text: text, type: type})
        return id;
    }


    public static tip(text: string) {
        return NotificationService.generic(text, 'tip')
    }

    public static danger(text: string) {
        return NotificationService.generic(text, 'danger')
    }
}