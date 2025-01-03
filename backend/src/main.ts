import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT
  const app = await NestFactory.create(AppModule);
  console.log(`Application running on port: ${port}!`);
  await app.listen(port);
}
bootstrap();
