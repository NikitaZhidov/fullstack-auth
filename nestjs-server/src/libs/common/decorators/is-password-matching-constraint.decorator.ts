import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { PasswordBaseDto } from '@/auth/dto/password-base.dto';

@ValidatorConstraint({ name: 'IsPasswordMatching', async: false })
export class IsPasswordMatchingConstraint implements ValidatorConstraintInterface {
  validate(passwordRepeat: string, args?: ValidationArguments) {
    const obj = args?.object as PasswordBaseDto;
    return obj.password === passwordRepeat;
  }

  defaultMessage(): string {
    return `The passwords don't match`;
  }
}
