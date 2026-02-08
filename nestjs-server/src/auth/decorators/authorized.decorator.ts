import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

import { User } from '@/generated/prisma/client';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const user = (request as unknown as { user: User }).user;

    return data ? user[data] : user;
  },
);
