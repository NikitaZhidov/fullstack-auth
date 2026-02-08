import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, verify } from 'argon2';
import { Request, Response } from 'express';

import { User } from '@/generated/prisma/client';
import { AuthMethod } from '@/generated/prisma/enums';
import { PrismaService } from '@/prisma/prisma.service';
import { UserService } from '@/user/user.service';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { NewPasswordDto } from './password-recovery/dto/new-password.dto';
import { ProviderService } from './provider/provider.service';
import { TwoFactorAuthService } from './two-factor-auth/two-factor-auth.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly providerService: ProviderService,
    private readonly prismaService: PrismaService,
    private readonly emailConfirmationService: EmailConfirmationService,
    private readonly twoFactorAuthService: TwoFactorAuthService,
  ) {}

  async register(req: Request, dto: RegisterDto) {
    const existingUser = await this.userService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException(
        'The user with that email already exists. Please use another email or log in.',
      );
    }

    const newUser = await this.userService.create(
      dto.email,
      dto.password,
      dto.name,
      '',
      AuthMethod.CREDENTIALS,
      false,
    );

    await this.emailConfirmationService.sendVerificationToken(newUser);

    return {
      message:
        'Registration successful. Please confirm your email. The confirmation message has been sent to your email address.',
    };
  }

  async login(req: Request, loginDto: LoginDto) {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user || !user.password) {
      throw new NotFoundException(
        'The user does not exist. Check the entered credentials.',
      );
    }

    const isValidPassword = await verify(user.password, loginDto.password);

    if (!isValidPassword) {
      throw new UnauthorizedException(
        'The password is invalid. Please try again or reset password if you forgot it.',
      );
    }

    if (!user.isVerified) {
      await this.emailConfirmationService.sendVerificationToken(user);

      throw new UnauthorizedException(
        'Your email address is not verified. Please check your email inbox and confirm your email address.',
      );
    }

    if (user.isTwoFactorEnabled) {
      if (!loginDto.code) {
        await this.twoFactorAuthService.sendTwoFactorToken(user.email);

        return {
          message:
            'The two factor authentification code has been sent to your email.',
        };
      } else {
        await this.twoFactorAuthService.validateTwoFactorToken(
          user.email,
          loginDto.code,
        );
      }
    }

    return this.saveSession(req, user);
  }

  async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          console.error(err);

          return reject(
            new InternalServerErrorException(
              'The session has not been terminated. Something wrong with the server or the session has already been terminated.',
            ),
          );
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'));
        resolve();
      });
    });
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
      throw new UnauthorizedException(
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

  async extractProfileFromCode(
    req: Request,
    providerName: string,
    code: string,
  ) {
    const providerInstance = this.providerService.findByService(providerName);

    if (!providerInstance) {
      throw new NotFoundException(`Provider "${providerName}" does not exist`);
    }

    const profile = await providerInstance.findUserByCode(code);

    const account = await this.prismaService.account.findFirst({
      where: { id: profile.id, provider: profile.provider },
    });

    let user = account?.userId
      ? await this.userService.findById(account.userId)
      : null;

    if (user) {
      return this.saveSession(req, user);
    }

    user = await this.userService.create(
      profile.email,
      '',
      profile.name,
      profile.picture,
      profile.provider.toUpperCase() as AuthMethod,
      true,
    );

    if (!account) {
      await this.prismaService.account.create({
        data: {
          userId: user.id,
          type: 'oauth',
          provider: profile.provider,
          accessToken: profile.access_token,
          refreshToken: profile.refresh_token,
          expiresAt: profile.expires_at ?? 0,
        },
      });
    }

    return this.saveSession(req, user);
  }

  saveSession(req: Request, user: User) {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id;

      req.session.save(err => {
        if (err) {
          console.error(err);

          return reject(
            new InternalServerErrorException(
              'The session has not been saved. Please, check the settings of the session.',
            ),
          );
        }

        resolve({ user });
      });
    });
  }
}
