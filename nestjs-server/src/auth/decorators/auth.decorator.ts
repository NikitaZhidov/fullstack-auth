import { UseGuards, applyDecorators } from '@nestjs/common';

import { UserRole } from '@/generated/prisma/enums';

import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

import { Roles } from './roles.decorator';

export function Authorization(...roles: UserRole[]) {
  if (roles.length) {
    return applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
  }

  return applyDecorators(UseGuards(AuthGuard));
}
