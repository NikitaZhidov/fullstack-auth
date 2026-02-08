import { BaseOAuthSerivce } from './base-oauth.service';
import { ProviderOptions } from './types/provider-options';
import { UserInfo } from './types/user-info';

export interface GoogleProfile {
  sub: string; // уникальный ID пользователя (OIDC)
  id?: string; // иногда встречается в старых ответах
  email?: string;
  email_verified?: boolean;
  verified_email?: boolean; // legacy поле
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
  hd?: string; // Google Workspace domain
}

export class GoogleProvider extends BaseOAuthSerivce {
  constructor(options: ProviderOptions) {
    super({
      name: 'google',
      authorize_url: 'https://accounts.google.com/o/oauth2/v2/auth',
      access_url: 'https://oauth2.googleapis.com/token',
      profile_url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      scopes: options.scopes,
      client_id: options.client_id,
      client_secret: options.client_secret,
    });
  }

  protected async extractUserInfo(data: GoogleProfile): Promise<UserInfo> {
    return super.extractUserInfo({
      email: data.email,
      name: data.name,
      picture: data.picture,
    });
  }
}
