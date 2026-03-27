export type NotificationType =
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'download_ready';

export interface Notification {
  id: string;
  title: string;
  description?: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  data?: Record<string, unknown>;
}
