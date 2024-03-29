import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');

  // app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(process.env.PORT);
}
bootstrap();
