import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { NewPasswordDto } from './dto/new-password.dto';
import { ResetPasswordDto as RequestResetPasswordDto } from './dto/reset-password.dto';
import { PasswordRecoveryService } from './password-recovery.service';

@Controller('auth/password-recovery')
export class PasswordRecoveryController {
  constructor(
    private readonly passwordRecoveryService: PasswordRecoveryService,
  ) {}

  @Post('new-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() newPasswordDto: NewPasswordDto) {
    return this.passwordRecoveryService.resetPassword(newPasswordDto);
  }

  @Post('request-reset-password')
  @HttpCode(HttpStatus.OK)
  newPassword(@Body() requestPasswordDto: RequestResetPasswordDto) {
    return this.passwordRecoveryService.requestResetPassword(
      requestPasswordDto.email,
    );
  }
}
