import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { AppService } from './app.service';
import { ProductService } from './products/product.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS for all routes using the cors middleware
  app.use(cors());
  await app.listen(5000);

  // Save the products from the sql file
  const service = app.get(ProductService);
  await service.addProductsOnStart();
}
bootstrap();
