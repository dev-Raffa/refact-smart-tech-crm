import { useEffect, useRef } from 'react';
import { useNotificationsStore } from '../store';
import { SSEClient } from '@/infra/sse/client';
import { useAuthStore } from '../../auth/store';

export const useNotificationsListener = () => {
  const addNotification = useNotificationsStore(
    (state) => state.addNotification
  );
  //const baseUrl = import.meta.env.NOTIFICATIONS_API_URL;
  const clientRef = useRef<SSEClient | null>(null);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      clientRef.current?.close();
      return;
    }
    if (clientRef.current) return;
    /*
    const client = new SSEClient({
      url: `${baseUrl}/notifications/stream`,
      token,
      reconnectInterval: 5000,
      onMessage: (payload: any) => {
        addNotification({
          title: payload.title || 'Nova Notificação',
          description: payload.message || payload.description,
          type: payload.type || 'info', // 'info' | 'success' | 'warning' | 'error' | 'download_ready'
          data: payload.data || {}
        });
      },
      onError: (error) => {
        console.warn('[Notifications] Connection issue', error);
      }
    });
    */
    //client.connect();
    // clientRef.current = client;

    return () => {
      //client.close();
      clientRef.current = null;
    };
  }, [addNotification, token]);
};
