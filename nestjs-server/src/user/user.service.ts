import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';

import { User } from '@/generated/prisma/client';
import { AuthMethod } from '@/generated/prisma/enums';
import { PrismaService } from '@/prisma/prisma.service';

import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: { accounts: true },
    });

    if (!user) {
      throw new NotFoundException('The user has not been not found');
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
      include: { accounts: true },
    });

    return user;
  }

  async create(
    email: string,
    password: string,
    displayName: string,
    picture: string,
    method: AuthMethod,
    isVerified: boolean,
  ) {
    const user = await this.prismaService.user.create({
      data: {
        email,
        password: password ? await hash(password) : '',
        displayName,
        picture,
        method,
        isVerified,
      },
      include: { accounts: true },
    });

    return user;
  }

  async update(userId: User['id'], updateDto: UpdateUserDto) {
    const user = await this.findById(userId);

    const updatedUser = await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        email: updateDto.email,
        displayName: updateDto.name,
        isTwoFactorEnabled: updateDto.isTwoFactorEnabled,
      },
    });

    return updatedUser;
  }
}
