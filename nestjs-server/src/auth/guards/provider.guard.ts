import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Request } from 'express';

import { ProviderService } from '../provider/provider.service';

@Injectable()
export class AuthProviderGuard implements CanActivate {
  constructor(private readonly providerService: ProviderService) {}

  canActivate(context: ExecutionContext) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const request = context.switchToHttp().getRequest() as Request;

    const providerName = request.params.provider as string;

    const providerInstance = this.providerService.findByService(providerName);

    if (!providerInstance) {
      throw new NotFoundException(
        `The provider "${providerName}" has not been found. Please check the entered data`,
      );
    }

    return true;
  }
}
