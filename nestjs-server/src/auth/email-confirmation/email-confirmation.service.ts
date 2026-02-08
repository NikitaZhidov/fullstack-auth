import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

import { User } from '@/generated/prisma/client';
import { MailService } from '@/libs/mail/mail.service';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';

import { AuthService } from '../auth.service';

import { ConfirmationDto } from './dto/confirmation.dto';

const ONE_HOUR = 1000 * 60 * 60;
const TOKEN_EXPIRATION_TIME = ONE_HOUR;

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailService: MailService,
    private readonly userService: UserService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async verifyUserByToken(req: Request, dto: ConfirmationDto) {
    const existingToken = await this.prismaService.token.findUnique({
      where: {
        token: dto.token,
        type: 'VERIFICATION',
      },
    });

    if (!existingToken) {
      throw new NotFoundException(
        'The confirmation token has not been found. Please check if the token is correct.',
      );
    }

    const isExpired = new Date(existingToken.expiresIn) < new Date();

    if (isExpired) {
      throw new BadRequestException(
        'The confirmation token is expired. Please request another one.',
      );
    }

    const existingUser = await this.userService.findByEmail(
      existingToken.email,
    );

    if (!existingUser) {
      throw new NotFoundException(
        'The user with that email address has not been found. Check if the email is correct.',
      );
    }

    await this.prismaService.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isVerified: true,
      },
    });

    await this.prismaService.token.delete({
      where: { id: existingToken.id, type: 'VERIFICATION' },
    });

    return this.authService.saveSession(req, existingUser);
  }

  async sendVerificationToken(user: User) {
    const verificationToken = await this.generateVerificationToken(user.email);

    await this.mailService.sendConfirmationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return true;
  }

  private async generateVerificationToken(email: string) {
    const token = uuidv4();
    const expiresIn = new Date(new Date().getTime() + TOKEN_EXPIRATION_TIME);

    const existingToken = await this.prismaService.token.findFirst({
      where: { email, type: 'VERIFICATION' },
    });

    if (existingToken) {
      await this.prismaService.token.delete({
        where: { id: existingToken.id, type: 'VERIFICATION' },
      });
    }

    const verificationToken = await this.prismaService.token.create({
      data: { email, token, type: 'VERIFICATION', expiresIn },
    });

    return verificationToken;
  }
}
