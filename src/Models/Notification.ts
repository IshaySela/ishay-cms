
export type NotificationTypes = 'tip' | 'info' | 'danger'

export interface AppNotification {
    text: string;
    id: string;
    dismissTimeoutMs: number;
    type: NotificationTypes
}