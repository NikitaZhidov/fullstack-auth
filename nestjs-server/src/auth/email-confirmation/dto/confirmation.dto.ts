import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmationDto {
  @IsString({ message: 'Token should be a string' })
  @IsNotEmpty({ message: 'Token cannot be empty' })
  token: string;
}
