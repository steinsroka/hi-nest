import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      // controller에서 타입을 바꿔줌
      // -> e2e테스트시 에는 동작하지 않음(테스트시 새로운 어플리케이션을 만들지만 pipe를 사용하지 않음)
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
