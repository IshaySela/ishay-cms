
export interface AppNotification {
    text: string;
    id: string;
    dismissTimeoutMs: number;
    type: 'tip' | 'info' | 'danger'
}