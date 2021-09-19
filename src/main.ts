import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'source-map-support/register';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 2002;

  app.enableCors();
  await app.listen(PORT, () => console.log('Server started on port = ', PORT));
}
bootstrap();
