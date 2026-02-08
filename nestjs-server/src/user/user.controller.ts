import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { Authorization } from '@/auth/decorators/auth.decorator';
import { Authorized } from '@/auth/decorators/authorized.decorator';
import { User } from '@/generated/prisma/client';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization()
  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async findProfile(@Authorized('id') userId: User['id']) {
    return this.userService.findById(userId);
  }

  @Authorization()
  @Post('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(@Body() updateDto: UpdateUserDto, @Req() req: Request) {
    return this.userService.update(req.session.userId ?? '', updateDto);
  }
}
