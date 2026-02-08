import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from '@/generated/prisma/client';
import { UserRole } from '@/generated/prisma/enums';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const user: User = context.switchToHttp().getRequest().user as User;

    if (!roles) {
      return true;
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException('You do not have access to this resource.');
    }

    return true;
  }
}
