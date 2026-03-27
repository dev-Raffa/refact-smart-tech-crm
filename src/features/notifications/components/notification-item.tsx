import { format } from 'date-fns';
import {
  CheckCircle2,
  Download,
  Info,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { cn } from '@/shared/utils';
import type { Notification } from '../types';

interface NotificationItemProps {
  notification: Notification;
  onClick?: (notification: Notification) => void;
}

const iconMap = {
  info: <Info className="h-4 w-4 text-blue-500" />,
  success: <CheckCircle2 className="h-4 w-4 text-emerald-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-amber-500" />,
  error: <XCircle className="h-4 w-4 text-red-500" />,
  download_ready: <Download className="h-4 w-4 text-indigo-500" />
};

export const NotificationItem = ({
  notification,
  onClick
}: NotificationItemProps) => {
  const Icon = iconMap[notification.type] || iconMap.info;

  return (
    <div
      onClick={() => onClick?.(notification)}
      className={cn(
        'flex flex-col gap-1 p-3 rounded-lg transition-colors cursor-pointer border-l-2',
        'hover:bg-muted/50',
        notification.read
          ? 'bg-background border-transparent'
          : 'bg-blue-50/30 border-blue-500'
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">{Icon}</div>

        <div className="flex-1 space-y-1">
          <p
            className={cn(
              'text-sm font-medium leading-none',
              !notification.read && 'font-semibold'
            )}
          >
            {notification.title}
          </p>

          {notification.description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {notification.description}
            </p>
          )}

          {notification.type === 'download_ready' && (
            <span className="text-xs text-indigo-600 underline font-medium flex items-center gap-1 mt-1">
              Clique para baixar
            </span>
          )}
        </div>
      </div>

      <span className="text-[10px] text-muted-foreground self-end italic">
        {format(new Date(notification.createdAt), 'dd/MM HH:mm')}
      </span>
    </div>
  );
};
