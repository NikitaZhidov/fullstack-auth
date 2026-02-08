import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MailService } from '@/libs/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';

const ONE_HOUR = 1000 * 60 * 60;
const TOKEN_EXPIRATION_TIME = ONE_HOUR;

const generate6digitCode = () =>
  Math.floor(Math.random() * (1_000_000 - 100_000) + 100_000).toString();

@Injectable()
export class TwoFactorAuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  async sendTwoFactorToken(email: string) {
    const token = await this.generateTwoFactorToken(email);

    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User with that email does not exist.');
    }

    await this.mailService.sendTwoFactorEmail(email, token.token);

    return true;
  }

  async validateTwoFactorToken(email: string, code: string) {
    const token = await this.prismaService.token.findFirst({
      where: { email, type: 'TWO_FACTOR' },
    });

    if (!token) {
      throw new NotFoundException('The token does not exist.');
    }

    if (token.token !== code) {
      throw new BadRequestException(
        'The provided code is not correct. Please, check the entered code and try again.',
      );
    }

    const isExpired = new Date() > new Date(token.expiresIn);

    if (isExpired) {
      throw new BadRequestException('The token is expired.');
    }

    await this.prismaService.token.delete({
      where: { token: token.token, type: 'TWO_FACTOR' },
    });

    return true;
  }

  private async generateTwoFactorToken(email: string) {
    const token = generate6digitCode();
    const existingToken = await this.prismaService.token.findFirst({
      where: { email, type: 'TWO_FACTOR' },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: { token: existingToken.token, type: 'TWO_FACTOR' },
      });
    }

    const expiresIn = new Date(new Date().getTime() + TOKEN_EXPIRATION_TIME);

    const newToken = await this.prismaService.token.create({
      data: { email, expiresIn, token, type: 'TWO_FACTOR' },
    });

    return newToken;
  }
}
