export type SessionStatus =
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'expired'
  | 'idle';

export interface LoginCredentials {
  username: string;
  password: string;
  tenant: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  roles: string[];
  tenant: string;
  userType?: string;
}

export interface AuthSession {
  token: string | null;
  expiresAt: number | null;
  user: User | null;
  status: SessionStatus;
  tenant: string | null;
}
export interface TokenClaims {
  userId: string;
  email: string;
  name: string;
  roles: string[];
  tenant: string;
  expirationTime: number;
}

export interface SSOAuthotize {
  token: string
}