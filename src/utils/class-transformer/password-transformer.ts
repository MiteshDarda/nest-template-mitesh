import * as bcrypt from 'bcrypt';

export class PasswordTransformer {
  to(value: string): string {
    // Encrypt the password using bcrypt
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
  }

  from(value: string): string {
    // Return the encrypted password as is
    return value;
  }
}
