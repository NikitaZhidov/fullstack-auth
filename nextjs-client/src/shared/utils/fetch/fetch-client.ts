import { FetchError } from './fetch-error';
import { RequestOptions, SearchParams } from './fetch-types';

export type FetchClientOptions = {
  baseUrl: string;
  headers?: Record<string, string>;
  params?: SearchParams;
  options?: RequestOptions;
};

export class FetchClient {
  private baseUrl: FetchClientOptions['baseUrl'];
  headers?: FetchClientOptions['headers'];
  params?: FetchClientOptions['params'];
  options?: FetchClientOptions['options'];

  constructor(options: FetchClientOptions) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
    this.params = options.params;
    this.options = options.options;
  }

  get<T>(endpoint: string, options?: Omit<RequestOptions, 'body'>) {
    return this.request<T>(endpoint, 'GET', options);
  }

  post<T, TBody extends Record<string, unknown> = Record<string, unknown>>(
    endpoint: string,
    body?: TBody,
    options?: Omit<RequestOptions, 'body'>,
  ) {
    return this.request<T>(endpoint, 'POST', {
      ...(options ?? {}),
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T, TBody extends Record<string, unknown>>(
    endpoint: string,
    body?: TBody,
    options?: Omit<RequestOptions, 'body'>,
  ) {
    return this.request<T>(endpoint, 'PUT', {
      ...(options ?? {}),
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T, TBody extends Record<string, unknown>>(
    endpoint: string,
    body?: TBody,
    options?: Omit<RequestOptions, 'body'>,
  ) {
    return this.request<T>(endpoint, 'PATCH', {
      ...(options ?? {}),
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers ?? {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(endpoint: string, options?: Omit<RequestOptions, 'body'>) {
    return this.request<T>(endpoint, 'DELETE', options);
  }

  private async request<T>(
    endpoint: string,
    method: RequestInit['method'],
    options?: RequestOptions,
  ) {
    let url = `${this.baseUrl}/${endpoint[0] === '/' ? endpoint.slice(1) : endpoint}`;

    if (options?.params) {
      url += this.createSearchParams(options?.params);
    }

    const config: RequestInit = {
      ...options,
      ...(this.options ?? {}),
      method,
      headers: {
        ...(this.headers ?? {}),
        ...(options?.headers ?? {}),
      },
    };

    const response: Response = await fetch(url, config);

    if (!response.ok) {
      const err = (await response.json()) as { message: string } | undefined;

      throw new FetchError(
        response.status,
        err?.message || response.statusText,
      );
    }

    if (response.headers.get('Content-Type')?.includes('application/json')) {
      return (await response.json()) as T;
    }

    return (await response.text()) as T;
  }

  private createSearchParams(params?: SearchParams) {
    const searchParams = new URLSearchParams();

    const allParams = { ...(this.options?.params ?? {}), ...(params ?? {}) };

    for (const key in allParams) {
      const value = allParams[key];

      if (Array.isArray(value)) {
        value.forEach(v => v && searchParams.append(key, v?.toString()));
      } else if (value) {
        searchParams.set(key, value.toString());
      }
    }

    return `?${searchParams.toString()}`;
  }
}
