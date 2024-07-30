import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { authorization } = req.headers;

    // Return false if authorization header is not present
    if (!authorization) {
      this.logger.warn('Authorization header not found');
      return true;
    }

    const [, token] = authorization.split(' ');

    try {
      // Verify the token using JwtService
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configuration().jwt.secret,
      });

      // Attach the user information from the payload to req.user
      req.user = payload;
      this.logger.log('Token verification succeeded, user authenticated');
      return true; // Allow the request to proceed
    } catch (e) {
      // Log the error for debugging
      this.logger.error(`Token verification failed: ${e.message}`);
      return false; // Deny access if token verification fails
    }
  }
}
