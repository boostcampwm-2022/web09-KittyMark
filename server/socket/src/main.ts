import { NestFactory } from '@nestjs/core';
import { EventsModule } from './event/event.module';


async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  await app.listen(2000);
}
bootstrap();
