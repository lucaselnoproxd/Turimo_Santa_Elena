import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
import type { Request } from 'express';

export const MAX_ATTEMPTS = 5;
export const BLOCK_MINUTES = 15;
export const SESSION_HOURS = 12;

// Rate limit en memoria: cuenta fallos por IP y bloquea 15 minutos
// tras 5 intentos fallidos. Suficiente para un solo panel de admin.
@Injectable()
export class AdminAuthService {
  private readonly attempts = new Map<
    string,
    { count: number; blockedUntil: number }
  >();

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  private secret(): string {
    return this.config.get('JWT_SECRET', 'dev-secret');
  }

  private isConfigured(): boolean {
    return Boolean(
      this.config.get('ADMIN_USER') && this.config.get('ADMIN_PASS'),
    );
  }

  private checkBlocked(ip: string): void {
    const rec = this.attempts.get(ip);
    if (!rec?.blockedUntil || rec.blockedUntil <= Date.now()) return;
    const mins = Math.ceil((rec.blockedUntil - Date.now()) / 60000);
    throw new UnauthorizedException(
      `Demasiados intentos fallidos. Espera ${mins} minuto${mins === 1 ? '' : 's'} e inténtalo de nuevo.`,
    );
  }

  private registerFailure(ip: string): void {
    const prev = this.attempts.get(ip);
    const count = (prev?.count ?? 0) + 1;
    if (count >= MAX_ATTEMPTS) {
      this.attempts.set(ip, {
        count: 0,
        blockedUntil: Date.now() + BLOCK_MINUTES * 60_000,
      });
      return;
    }
    this.attempts.set(ip, { count, blockedUntil: prev?.blockedUntil ?? 0 });
  }

  /**
   * Valida credenciales y devuelve el token JWT. Lanza excepción si
   * el panel no está configurado (faltan ADMIN_USER / ADMIN_PASS en
   * las variables de entorno del servidor).
   */
  login(ip: string, user: string, password: string): string {
    if (!this.isConfigured()) {
      throw new UnauthorizedException(
        'Panel no configurado: faltan ADMIN_USER y ADMIN_PASS en las variables de entorno del servidor.',
      );
    }

    this.checkBlocked(ip);

    const adminUser = this.config.get<string>('ADMIN_USER') ?? '';
    const adminPass = this.config.get<string>('ADMIN_PASS') ?? '';

    const validUser = typeof user === 'string' && user === adminUser;
    const validPass =
      typeof password === 'string' && bcrypt.compareSync(password, adminPass);

    if (!validUser || !validPass) {
      this.registerFailure(ip);
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    this.attempts.delete(ip);
    return this.jwt.sign(
      { sub: 'admin', role: 'admin' },
      { secret: this.secret(), expiresIn: `${SESSION_HOURS}h` },
    );
  }

  me(): { user: string; name: string } {
    return {
      user: this.config.get('ADMIN_USER', 'admin'),
      name: 'Administrador',
    };
  }
}

export function clientIp(request: Request): string {
  const fwd = request.headers['x-forwarded-for'];
  if (typeof fwd === 'string' && fwd) return fwd.split(',')[0].trim();
  return request.ip ?? 'unknown';
}
