import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector }    from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { UserRole }     from 'src/usuario/entities/usuario.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    // 1) pega as roles exigidas pelo decorator
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
    // se não houver roles, libera
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // 2) garante que vem um user do JwtAuthGuard
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;
    if (!user) {
      throw new UnauthorizedException('Usuário não autenticado');
    }

    // 3) checa a role
    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Acesso negado: role inválida');
    }

    return true;
  }
}