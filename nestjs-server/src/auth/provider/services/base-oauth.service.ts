import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { BaseProviderOptions } from './types/base-provider-options';
import { UserInfo } from './types/user-info';

@Injectable()
export class BaseOAuthSerivce {
  private BASE_URL: string;

  constructor(private readonly options: BaseProviderOptions) {}

  protected extractUserInfo(data: any): Promise<UserInfo> {
    return new Promise(resolve => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return resolve({
        ...data,
        provider: this.options.name,
      });
    });
  }

  getAuthUrl() {
    const query = new URLSearchParams({
      response_type: 'code',
      client_id: this.options.client_id,
      redirect_uri: this.getRedirectUrl(),
      scope: (this.options.scopes ?? []).join(' '),
      access_type: 'offline',
      prompt: 'select_account',
    });

    return `${this.options.authorize_url}?${query}`;
  }

  async findUserByCode(code: string): Promise<UserInfo> {
    const client_id = this.options.client_id;
    const client_secret = this.options.client_secret;

    const tokenQuery = new URLSearchParams({
      client_id,
      client_secret,
      code,
      redirect_uri: this.getRedirectUrl(),
      grant_type: 'authorization_code',
    });

    const tokenRequest = await fetch(this.options.access_url, {
      method: 'POST',
      body: tokenQuery,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });

    if (!tokenRequest.ok) {
      throw new BadRequestException(
        `Unable to get the user's data. Check the access token validity.`,
      );
    }

    const tokenResponse = (await tokenRequest.json()) as unknown as {
      access_token?: string;
      refresh_token?: string;
      expires_at?: number;
      expires_in?: number;
    };

    if (!tokenResponse.access_token) {
      throw new BadRequestException(
        `No tokens for this url "${this.options.access_url}". Check if the auth code is valid.`,
      );
    }

    const userRequest = await fetch(this.options.profile_url, {
      headers: {
        Authorization: `Bearer ${tokenResponse.access_token}`,
      },
    });

    if (!userRequest.ok) {
      throw new UnauthorizedException(
        `Unable to get user info for this url ${this.options.profile_url}. Check if the access token is valid.`,
      );
    }

    const user = (await userRequest.json()) as UserInfo;
    const userData = await this.extractUserInfo(user);

    return {
      ...userData,
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
      expires_at: tokenResponse.expires_at || tokenResponse.expires_in,
      provider: this.options.name,
    };
  }

  getRedirectUrl() {
    return `${this.BASE_URL}/auth/oauth/callback/${this.options.name}`;
  }

  set baseUrl(val: string) {
    this.BASE_URL = val;
  }

  get name() {
    return this.options.name;
  }

  get access_url() {
    return this.options.access_url;
  }

  get profile_url() {
    return this.options.profile_url;
  }

  get scopes() {
    return this.options.scopes;
  }
}
