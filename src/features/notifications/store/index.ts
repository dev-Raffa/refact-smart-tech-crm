import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Notification } from '../types';

interface NotificationsState {
  notifications: Notification[];
  addNotification: (
    notification: Omit<Notification, 'id' | 'read' | 'createdAt'>
  ) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  getUnreadCount: () => number;
}

export const useNotificationsStore = create<NotificationsState>()(
  persist(
    (set, get) => ({
      notifications: [],

      addNotification: (payload) => {
        const newNotification: Notification = {
          id: crypto.randomUUID(),
          read: false,
          createdAt: new Date().toISOString(),
          ...payload
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications]
        }));
      },

      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          )
        }));
      },

      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true }))
        }));
      },

      removeNotification: (id) => {
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id)
        }));
      },

      clearAll: () => {
        set({ notifications: [] });
      },

      getUnreadCount: () => {
        return get().notifications.filter((n) => !n.read).length;
      }
    }),
    {
      name: 'inventto-notifications-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
