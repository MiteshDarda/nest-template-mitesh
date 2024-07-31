import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';

/**
 * AuthGuard is responsible for verifying the JWT token to authenticate users.
 *
 * - If the token is valid, the user information is attached to the request object.
 * - If the token is invalid, the request is denied.
 * - If the token is absent, the request is allowed to proceed but without user information.
 */

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { authorization } = req.headers;

    // Check if the authorization header is present
    if (!authorization) {
      this.logger.warn('Authorization header not found');
      return true; // Proceed without user authentication
    }

    const [, token] = authorization.split(' ');

    try {
      // Verify the JWT token using the JwtService
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configuration().jwt.secret,
      });

      // Attach the user information from the payload to req.user
      req.user = payload;
      this.logger.log('Token verification succeeded, user authenticated');
      return true; // Allow the request to proceed
    } catch (e) {
      // Log the error for debugging purposes
      this.logger.error(`Token verification failed: ${e.message}`);
      return false; // Deny access if token verification fails
    }
  }
}
