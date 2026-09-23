import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import type { Request, Response } from 'express';
import type { Express } from 'express';

let app: Awaited<ReturnType<typeof NestFactory.create>> | null = null;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(AppModule);

    const rawOrigins = process.env.CORS_ORIGINS;
    const origins = rawOrigins
      ? rawOrigins.split(',').map((o) => o.trim())
      : ['http://localhost:5173', 'https://turismo-santa-elena.vercel.app'];

    app.enableCors({
      origin: origins,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    app.setGlobalPrefix('api');
    await app.init();
  }
  return app;
}

const isServerless = process.env.VERCEL === '1';

if (!isServerless) {
  void (async () => {
    const app = await bootstrap();
    const port = process.env.PORT ?? 3000;
    await app.listen(port);
    console.log(`Backend corriendo en http://localhost:${port}`);
  })();
}

/**
 * Handler para Vercel Functions (serverless).
 * Solo se usa cuando VERCEL=1.
 */
export default async function handler(request: Request, response: Response) {
  const app = await bootstrap();
  const server = app.getHttpAdapter().getInstance() as Express;
  server(request, response);
}
