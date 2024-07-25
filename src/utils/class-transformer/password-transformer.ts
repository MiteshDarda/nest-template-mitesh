import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Password transformer
 *
 * @class
 * @name PasswordTransformer
 * @property {string} to - Encrypt the password using bcrypt
 * @property {string} from - Return the password as is
 * @property {boolean} isPasswordValid - Compare the password with the encrypted password
 */
@Injectable()
export class PasswordTransformer {
  /**
   * Encrypt the password using bcrypt
   */
  to(value: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
  }

  /**
   * Return the password as is
   */
  from(value: string): string {
    return value;
  }

  /**
   * Compare the password with the encrypted password
   * @param {string} password - The password to compare
   * @param {string} encryptedPassword - The encrypted password to compare
   */
  isPasswordValid(password: string, encryptedPassword: string): boolean {
    try {
      return bcrypt.compareSync(password, encryptedPassword);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
