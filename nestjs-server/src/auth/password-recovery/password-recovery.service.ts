import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';
import { v4 as uuidv4 } from 'uuid';

import { MailService } from '@/libs/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';

import { NewPasswordDto } from './dto/new-password.dto';

const ONE_HOUR = 1000 * 60 * 60;
const TOKEN_EXPIRATION_TIME = ONE_HOUR;

@Injectable()
export class PasswordRecoveryService {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async requestResetPassword(email: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User with that email does not exist');
    }

    const token = await this.generateResetPasswordToken(email);

    await this.mailService.sendResetPasswordEmail(email, token.token);

    return true;
  }

  async resetPassword(dto: NewPasswordDto) {
    const token = await this.prismaService.token.findFirst({
      where: { token: dto.token, type: 'PASSWORD_RESET' },
    });

    if (!token) {
      throw new NotFoundException(
        'The token does not exist. Check if the token is correct.',
      );
    }

    const isExpired = new Date() > new Date(token.expiresIn);

    if (isExpired) {
      throw new BadRequestException(
        'The token is not valid anymore. Request a new one.',
      );
    }

    const user = await this.userService.findByEmail(token.email);

    if (!user) {
      throw new NotFoundException(
        'The user for the token does not exist. Check if the token is valid.',
      );
    }

    await this.prismaService.token.delete({
      where: { token: token.token, type: 'PASSWORD_RESET' },
    });

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: await hash(dto.password),
      },
    });

    return true;
  }

  private async generateResetPasswordToken(email: string) {
    const token = uuidv4();
    const existingToken = await this.prismaService.token.findFirst({
      where: { email, type: 'PASSWORD_RESET' },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: { token: existingToken.token, type: 'PASSWORD_RESET' },
      });
    }

    const expiresIn = new Date(new Date().getTime() + TOKEN_EXPIRATION_TIME);

    const newToken = await this.prismaService.token.create({
      data: { email, expiresIn, token, type: 'PASSWORD_RESET' },
    });

    return newToken;
  }
}
