import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthProviderGuard } from './guards/provider.guard';
import { ProviderService } from './provider/provider.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly providerService: ProviderService,
    private readonly configService: ConfigService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Req() req: Request, @Body() dto: RegisterDto) {
    return this.authService.register(req, dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req: Request, @Body() dto: LoginDto) {
    return this.authService.login(req, dto);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.logout(req, res);
  }

  @Get('/oauth/callback/:provider')
  @UseGuards(AuthProviderGuard)
  async callback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Query('code') code: string,
    @Param('provider') provider: string,
  ) {
    if (!code) {
      throw new BadRequestException('No authorization code');
    }

    await this.authService.extractProfileFromCode(req, provider, code);

    return res.redirect(
      `${this.configService.getOrThrow<string>('ALLOWED_ORIGIN')}/dashboard/settings`,
    );
  }

  @UseGuards(AuthProviderGuard)
  @Get('/oauth/connect/:provider')
  connect(@Param('provider') providerName: string) {
    const providerInstance = this.providerService.findByService(providerName);

    return {
      url: providerInstance?.getAuthUrl(),
    };
  }
}
