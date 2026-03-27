import { jwtDecode } from 'jwt-decode';
import type {
  AuthSession,
  JwtPayloadDTO,
  LoginCredentials,
  LoginRequestDTO,
  LoginResponseDTO,
  User
} from '../types';

export class AuthMapper {
  static toDomain(dto: LoginResponseDTO): AuthSession {
    const decoded = jwtDecode<JwtPayloadDTO>(dto.accessToken);

    const user: User = {
      id: decoded.sub,
      email: decoded.email,
      name: decoded.name || decoded.unique_name,
      roles:
        typeof decoded.groups === 'string'
          ? [decoded.groups]
          : decoded.groups || [],
      tenant: decoded.tenant,
      userType: decoded.extension_UserType,
      firstName: decoded.name?.split(' ')[0] || '',
      lastName: decoded.name?.split(' ')[1] || ''
    };

    const expiresAt = decoded.exp * 1000;

    return {
      token: dto.accessToken,
      user,
      status: 'authenticated',
      expiresAt,
      tenant: decoded.tenant
    };
  }

  static toLoginDTO(domain: LoginCredentials): LoginRequestDTO {
    return {
      username: domain.username,
      password: domain.password,
      tenant: domain.tenant
    };
  }
}
