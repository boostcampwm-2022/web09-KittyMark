import { NestFactory } from '@nestjs/core';
import { EventsModule } from './event/event.module';
import { RedisIoAdapter } from './redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(2000);
}

bootstrap();
