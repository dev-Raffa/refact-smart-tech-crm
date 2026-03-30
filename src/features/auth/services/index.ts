import { identityClient } from '@/infra/api/auth-api';
import type {
  AuthSession,
  LoginCredentials,
  LoginRequestDTO,
  LoginResponseDTO
} from '../types';
import { AuthMapper } from './mapper';

export class authService {
  static async login(credentials: LoginCredentials): Promise<AuthSession> {
    const payload: LoginRequestDTO = AuthMapper.toLoginDTO(credentials);

    const { data } = await identityClient.post<LoginResponseDTO>(
      '/users/login',
      payload,
      {
        headers: {
          Tenant: payload.tenant
        }
      }
    );

    return AuthMapper.toDomain(data);
  }

  static async logout() {
    return Promise.resolve();
  }

  static async authorizeSSO(sso: LoginResponseDTO) {
    return AuthMapper.toDomain(sso);
  }

  static isSessionValid(expiresAt: number | null): boolean {
    if (!expiresAt) return false;

    return Date.now() < expiresAt;
  }
}
