import { IsNotEmpty, IsString, MinLength, Validate } from 'class-validator';

import { IsPasswordMatchingConstraint } from '@/libs/common/decorators/is-password-matching-constraint.decorator';

export class PasswordBaseDto {
  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(6, { message: 'Password should contain at least 6 characters' })
  password: string;

  @IsString({ message: 'Password should be a string' })
  @IsNotEmpty({ message: 'Password should not be empty' })
  @MinLength(6, {
    message: 'Password repeat should contain at least 6 characters',
  })
  @Validate(IsPasswordMatchingConstraint)
  passwordRepeat: string;
}
