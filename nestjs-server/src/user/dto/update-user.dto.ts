import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'Name should be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString({ message: 'Email should be a string' })
  @IsEmail({}, { message: 'Email is not valid' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsBoolean({ message: 'Two factor enabled should be boolean' })
  isTwoFactorEnabled: boolean;
}
