import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { getProvidersConfig } from '@/config/providers.config';
import { MailService } from '@/libs/mail/mail.service';
import { UserService } from '@/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { EmailConfirmationModule } from './email-confirmation/email-confirmation.module';
import { PasswordRecoveryModule } from './password-recovery/password-recovery.module';
import { ProviderModule } from './provider/provider.module';
import { TwoFactorAuthModule } from './two-factor-auth/two-factor-auth.module';

@Module({
  imports: [
    ProviderModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getProvidersConfig,
      inject: [ConfigService],
    }),
    forwardRef(() => EmailConfirmationModule),
    PasswordRecoveryModule,
    TwoFactorAuthModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, MailService],
  exports: [AuthService],
})
export class AuthModule {}
