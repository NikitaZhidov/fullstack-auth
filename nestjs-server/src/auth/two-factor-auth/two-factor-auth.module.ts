import { Module } from '@nestjs/common';

import { MailService } from '@/libs/mail/mail.service';
import { UserModule } from '@/user/user.module';

import { TwoFactorAuthController } from './two-factor-auth.controller';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Module({
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService, MailService],
  imports: [UserModule],
  exports: [TwoFactorAuthService],
})
export class TwoFactorAuthModule {}
