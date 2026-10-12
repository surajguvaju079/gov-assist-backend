import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: config.getOrThrow<string>('FRONTEND_URL'),
    credentials: true,
  })

  const port = config.getOrThrow<number>('PORT');
  await app.listen(port, '0.0.0.0');
  console.log(`API running on http://localhost:${port}/api`);
}
void bootstrap();



