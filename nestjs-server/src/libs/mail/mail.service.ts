import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { render } from '@react-email/components';

import { ConfirmationTemplate } from './templates/confirmation.template';
import { ResetPasswordTemplate } from './templates/reset-password.template';
import { TwoFactorTemplate } from './templates/two-factor.template';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendConfirmationEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');
    const html = await render(ConfirmationTemplate({ domain, token }));

    return this.sendMail(email, 'Email confirmation', html);
  }

  async sendResetPasswordEmail(email: string, token: string) {
    const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN');
    const html = await render(ResetPasswordTemplate({ domain, token }));

    return this.sendMail(email, 'Reset password', html);
  }

  async sendTwoFactorEmail(email: string, token: string) {
    const html = await render(TwoFactorTemplate({ token }));

    return this.sendMail(email, 'Verification of your identity', html);
  }

  private async sendMail(
    email: string,
    subject: string,
    html: string,
  ): Promise<unknown> {
    return this.mailerService.sendMail({
      to: email,
      subject,
      html,
    });
  }
}
