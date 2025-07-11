import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Allow only this origin
    credentials: true, // Needed for cookies, Authorization headers, etc.
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
