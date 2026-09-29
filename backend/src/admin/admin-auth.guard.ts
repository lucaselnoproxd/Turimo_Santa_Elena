import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

export interface AdminUser {
  sub: string;
  role: string;
}

interface AdminRequest extends Request {
  admin?: AdminUser;
}

// Lee la cookie httpOnly admin_token o, como alternativa, el header
// Authorization: Bearer. Preferimos la cookie (flujo del panel).
export function parseCookies(header?: string): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!header) return cookies;
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    const name = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (name) cookies[name] = decodeURIComponent(value);
  }
  return cookies;
}

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AdminRequest>();

    const cookies = parseCookies(request.headers.cookie);
    const header = request.headers.authorization;
    const token =
      cookies.admin_token ??
      (header?.startsWith('Bearer ') ? header.slice(7).trim() : '');

    if (!token) {
      throw new UnauthorizedException('No hay sesión de administrador');
    }

    try {
      const payload = this.jwt.verify<AdminUser>(token, {
        secret: this.config.get('JWT_SECRET', 'dev-secret'),
      });
      if (payload.role !== 'admin') {
        throw new UnauthorizedException('Sesión no válida');
      }
      request.admin = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Sesión expirada o inválida');
    }
  }
}

export function currentAdmin(context: ExecutionContext): AdminUser {
  return context.switchToHttp().getRequest<AdminRequest>().admin!;
}
