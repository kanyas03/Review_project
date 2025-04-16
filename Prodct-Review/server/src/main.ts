// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:8081', // Your frontend origin
    credentials: true, // Allow cookies if you're using them
  });

  await app.listen(3000);
}
bootstrap();
