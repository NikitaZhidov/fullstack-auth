import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { ProviderOptionsSymbol, TypeOptions } from './provider.constants';
import { BaseOAuthSerivce } from './services/base-oauth.service';

@Injectable()
export class ProviderService implements OnModuleInit {
  constructor(
    @Inject(ProviderOptionsSymbol)
    private readonly options: TypeOptions,
  ) {}

  onModuleInit() {
    for (const provider of this.options.services) {
      provider.baseUrl = this.options.baseUrl;
    }
  }

  findByService(serviceName: string): BaseOAuthSerivce | undefined {
    return this.options.services.find(s => s.name === serviceName);
  }
}
