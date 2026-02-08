import { FactoryProvider, ModuleMetadata } from '@nestjs/common';

import { BaseOAuthSerivce } from './services/base-oauth.service';

export const ProviderOptionsSymbol = Symbol();

export type TypeOptions = {
  baseUrl: string;
  services: BaseOAuthSerivce[];
};

export type TypeAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<TypeOptions>, 'useFactory' | 'inject'>;
