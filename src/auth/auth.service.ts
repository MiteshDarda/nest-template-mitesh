import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly jwtOptions: any;

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtOptions = {
      secret: this.configService.get<string>('jwt.secret'),
      signOptions: {
        algorithm: 'HS256',
      },
    };
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, this.jwtOptions),
    };
  }

  validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
