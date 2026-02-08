import { Controller } from '@nestjs/common';
import { TwoFactorAuthService } from './two-factor-auth.service';

@Controller('two-factor-auth')
export class TwoFactorAuthController {
  constructor(private readonly twoFactorAuthService: TwoFactorAuthService) {}
}
