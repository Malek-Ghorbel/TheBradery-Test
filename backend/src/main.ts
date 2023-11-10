import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all routes using the cors middleware
  app.use(cors());
  await app.listen(5000);
}
bootstrap();
