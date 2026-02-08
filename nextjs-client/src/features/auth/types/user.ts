import { AuditEntity } from '@/shared/types';

export enum UserRole {
  Regular = 'REGULAR',
  ADMIN = 'ADMIN',
}

export enum AuthMethod {
  Credentials = 'CREDENTIALS',
  Google = 'GOOGLE',
  Yandex = 'YANDEX',
}

export interface Account extends AuditEntity<string> {
  type: string;
  provider: string;
  refreshToken: string;
  accessToken: string;
  expiresAt: number;
  userId: string;
}

export interface User extends AuditEntity<string> {
  email: string;
  password: string;
  displayName: string;
  picture: string;
  role: UserRole;
  isVerified: boolean;
  isTwoFactorEnabled: boolean;
  method: AuthMethod;
  accounts: Account[];
}
