import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';

/**
 * This guard checks if the user has the necessary roles to access the route.
 *
 * @remarks
 * - If the route does not have the Roles() decorator, it is considered public.
 * - If the route has the Roles() decorator with the Role.All value, it is also considered public.
 *
 * @note
 * This guard relies on `user.role`, which is set by the AuthGuard.
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    if (requiredRoles.includes(Role.All)) {
      return true;
    }
    return requiredRoles.some((role) => user?.role?.includes(role));
  }
}
