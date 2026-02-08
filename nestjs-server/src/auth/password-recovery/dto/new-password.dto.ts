import { IsNotEmpty, IsString } from 'class-validator';

import { PasswordBaseDto } from '../../dto/password-base.dto';

export class NewPasswordDto extends PasswordBaseDto {
  @IsString({ message: 'Token should be a string' })
  @IsNotEmpty({ message: 'Token should not be empty' })
  token: string;
}
