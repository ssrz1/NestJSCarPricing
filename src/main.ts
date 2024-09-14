import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist is a variable to used if any additional value in request it oresent which is not defioned in our DTO
      //it will strip down those variable automatically.
      //it is a security thinggg
      whitelist: true,
    })
  )
  await app.listen(3000);
}
bootstrap();
