import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthSession } from '../types';

interface AuthState extends AuthSession {
  setSession: (session: AuthSession) => void;
  logout: () => void;
}

const initialState: AuthSession = {
  token: null,
  tenant: null,
  user: null,
  status: 'unauthenticated',
  expiresAt: null
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      setSession: (session) => {
        set(session);
      },

      logout: () => {
        set(initialState);
      }
    }),
    {
      name: 'smart-tech-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        expiresAt: state.expiresAt,
        status: state.token ? 'authenticated' : 'unauthenticated'
      })
    }
  )
);