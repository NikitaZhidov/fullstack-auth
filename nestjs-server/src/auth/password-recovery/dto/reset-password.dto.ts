import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsString({ message: 'Token should be a string' })
  @IsNotEmpty({ message: 'Token should not be empty' })
  @IsEmail({}, { message: 'Email is not valid' })
  email: string;
}
