import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import {
  AdminAuthService,
  clientIp,
  SESSION_HOURS,
} from './admin-auth.service';
import { AdminGuard } from './admin-auth.guard';

// Cookie admin_token httpOnly + Secure + SameSite. En producción
// (Vercel) el frontend y la API viven en dominios distintos, así que
// SameSite=None + Secure; en local el proxy de Vite lo hace same-site.
function adminCookieHeader(token: string, maxAgeSeconds: number): string {
  const isProd = process.env.VERCEL === '1';
  const parts = [
    `admin_token=${encodeURIComponent(token)}`,
    `Path=/`,
    `HttpOnly`,
    `Max-Age=${maxAgeSeconds}`,
    `Expires=${new Date(Date.now() + maxAgeSeconds * 1000).toUTCString()}`,
    ...(isProd ? ['Secure', 'SameSite=None'] : ['SameSite=Lax']),
  ];
  return parts.join('; ');
}

const SESSION_SECONDS = SESSION_HOURS * 60 * 60;

@Controller('admin')
export class AdminController {
  constructor(private readonly auth: AdminAuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() body: { user?: string; password?: string },
  ) {
    const token = this.auth.login(
      clientIp(req),
      body?.user ?? '',
      body?.password ?? '',
    );
    res.setHeader('Set-Cookie', adminCookieHeader(token, SESSION_SECONDS));
    return { ok: true };
  }

  @UseGuards(AdminGuard)
  @Get('me')
  me() {
    return this.auth.me();
  }

  @UseGuards(AdminGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.setHeader('Set-Cookie', adminCookieHeader('', 0));
    return { ok: true };
  }
}
