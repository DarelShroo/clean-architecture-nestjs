import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
