import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotificationsListener } from '../hooks/use-notifications-listener';
import { NotificationItem } from './notification-item';
import { useNotificationsStore } from '../store';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/shared/components/ui/popover';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/shared/components/ui/card';
import { ScrollArea } from '@/shared/components/ui/scroll-area';
import { Separator } from '@/shared/components/ui/separator';

export const NotificationsBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  useNotificationsListener();

  const { notifications, getUnreadCount, markAsRead, markAllAsRead, clearAll } =
    useNotificationsStore();

  const unreadCount = getUnreadCount();

  const handleNotificationClick = (notification: any) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.type === 'download_ready' && notification.data?.url) {
      window.open(notification.data.url as string, '_blank');
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />

          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-600 border-2 border-white" />
          )}
          <span className="sr-only">Notificações</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0 mr-4" align="end">
        <Card className="border-0 shadow-none">
          <CardHeader className="p-4 pb-2 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                Notificações
              </CardTitle>

              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 text-[10px] px-2 text-muted-foreground hover:text-primary"
                    onClick={() => markAllAsRead()}
                  >
                    Ler todas
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 text-[10px] px-2 text-muted-foreground hover:text-red-500"
                    onClick={() => clearAll()}
                  >
                    Limpar
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <ScrollArea className="h-[320px]">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-muted-foreground gap-2">
                  <Bell className="h-8 w-8 opacity-20" />
                  <p className="text-xs">Nenhuma notificação recente</p>
                </div>
              ) : (
                <div className="flex flex-col">
                  {notifications.map((notification, index) => (
                    <div key={notification.id}>
                      <NotificationItem
                        notification={notification}
                        onClick={handleNotificationClick}
                      />
                      {index < notifications.length - 1 && <Separator />}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};
