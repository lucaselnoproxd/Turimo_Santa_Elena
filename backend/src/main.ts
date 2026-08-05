import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:5173', 'https://playas-santa-elena.vercel.app'],
    methods: ['GET'],
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Backend corriendo en http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
