import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { PasswordTransformer } from 'src/utils/class-transformer/password-transformer';
import { Role } from 'src/roles/roles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Transform(({ value }) => new PasswordTransformer().to(value))
  password: string;

  @IsEnum(Role)
  role: Role = Role.User;
}
