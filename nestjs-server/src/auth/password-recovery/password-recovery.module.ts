import { Module } from '@nestjs/common';

import { MailService } from '@/libs/mail/mail.service';
import { UserModule } from '@/user/user.module';

import { PasswordRecoveryController } from './password-recovery.controller';
import { PasswordRecoveryService } from './password-recovery.service';

@Module({
  controllers: [PasswordRecoveryController],
  providers: [PasswordRecoveryService, MailService],
  imports: [UserModule],
})
export class PasswordRecoveryModule {}
