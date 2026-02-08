import { api } from '@/shared/api';

import { TypeRegisterSchema } from '../schemes';
import { TypeLoginSchema } from '../schemes/login.scheme';
import { AuthProvider, OAuthConnectResponse } from '../types';
import { User } from '../types/user';

export type LoginResponseMessage = { message: string };
export type LoginResponse = User | LoginResponseMessage;

export const isLoginMessage = (
  response: LoginResponse,
): response is LoginResponseMessage => {
  if ((response as unknown as LoginResponseMessage)?.message) {
    return true;
  }

  return false;
};

class AuthService {
  async register(registerInfo: TypeRegisterSchema) {
    return api.post<User, TypeRegisterSchema>('/auth/register', registerInfo);
  }

  async login(loginInfo: TypeLoginSchema) {
    return api.post<LoginResponse, TypeLoginSchema>('/auth/login', loginInfo);
  }

  async oauthByProvider(provider: AuthProvider) {
    return api.get<OAuthConnectResponse>(`auth/oauth/connect/${provider}`);
  }

  async logout() {
    return api.post<void>('/auth/logout');
  }
}

export const authService = new AuthService();
