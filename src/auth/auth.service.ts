import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtLoginType, JwtParamType } from './jwt-param.type';

@Injectable()
export class AuthService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.secret = this.configService.get<string>('jwt.secret');
    this.expiresIn = this.configService.get<string>('jwt.expiresIn');
  }
  //* ========================================== LOGIN ==========================================
  login(user: JwtLoginType) {
    try {
      const payload = { email: user.email, id: user.userId, role: user.role };
      const token = this.jwtService.sign(payload, {
        secret: this.secret,
        expiresIn: this.expiresIn,
        algorithm: 'HS256',
      });

      return {
        accessToken: token,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //* ========================================== VALIDATE ==========================================
  validate(payload: JwtParamType) {
    return { userId: payload.id, email: payload.email, role: payload.role };
  }
}
