import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @IsString({ message: 'Email should be a string' })
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password should contain at least 6 characters' })
  password: string;

  @IsOptional()
  @IsString({ message: 'Two factor code should be a string' })
  code: string;
}
