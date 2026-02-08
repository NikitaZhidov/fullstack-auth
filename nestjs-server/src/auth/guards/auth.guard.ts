import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { User } from '@/generated/prisma/client';
import { UserService } from '@/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const request = context.switchToHttp().getRequest();
    const userId = (request as Request).session.userId;

    if (typeof userId === 'undefined') {
      throw new UnauthorizedException(
        'The user is unauthorized. Please log in to access this resource.',
      );
    }

    const user = await this.userService.findById(userId);

    (request as Request & { user: User }).user = user;

    return true;
  }
}
