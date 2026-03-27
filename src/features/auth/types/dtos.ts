export interface LoginRequestDTO {
  username: string;
  password: string;
  tenant: string;
}

export interface LoginResponseDTO {
  accessToken: string;
}

export interface JwtPayloadDTO {
  sub: string;
  exp: number;
  iat: number;
  nbf?: number;
  iss?: string;
  aud?: string;
  jti?: string;
  nonce?: string;
  unique_name: string;
  email: string;
  name: string;
  groups: string | string[];
  tenant: string;
  extension_UserType: string;
}


export interface RoleAccess {
  roles: string[];
}

export interface ResourceAccess {
  "proposals-api"?: RoleAccess;
  "customers-api"?: RoleAccess;
  "workoperations-api"?: RoleAccess;
  "conversations-api"?: RoleAccess;
  "feijuca-auth-api"?: RoleAccess;
  "account"?: RoleAccess;
}

export interface JwtTokenDTO {
  exp: number;
  iat: number;
  jti: string;
  iss: string;
  aud: string[];
  sub: string;
  typ: string;
  azp: string;
  session_state: string;
  acr: string;
  "allowed-origins": string[];
  realm_access: RoleAccess;
  resource_access: ResourceAccess;
  scope: string;
  sid: string;
  email_verified: boolean;
  name: string;
  groups: string[];
  preferred_username: string;
  given_name: string;
  family_name: string;
  tenant: string;
  email: string;
}
