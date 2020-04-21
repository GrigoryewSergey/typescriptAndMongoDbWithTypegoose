import { NestFactory } from '@nestjs/core';
import { BookModule } from './bookModule';

async function bootstrap() {
  const app = await NestFactory.create(BookModule);
  await app.listen(3000);
}
bootstrap();
