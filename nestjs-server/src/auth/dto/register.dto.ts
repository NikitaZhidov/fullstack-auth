import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

import { PasswordBaseDto } from './password-base.dto';

export class RegisterDto extends PasswordBaseDto {
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;
}
