import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { UserRole } from '../enum/role.enum';
import { Transform } from 'class-transformer';
import { PasswordTransformer } from 'src/utils/class-transformer/password-transformer';

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

  @IsEnum(UserRole)
  role: UserRole = UserRole.User;
}
