import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { ConfirmationDto } from './dto/confirmation.dto';
import { EmailConfirmationService } from './email-confirmation.service';

@Controller('auth/email-confirmation')
export class EmailConfirmationController {
  constructor(
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async verifyUserByToken(@Req() req: Request, @Body() dto: ConfirmationDto) {
    return this.emailConfirmationService.verifyUserByToken(req, dto);
  }
}
