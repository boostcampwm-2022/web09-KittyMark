import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as createRedisStore from 'connect-redis';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as passport from 'passport';
import * as session from 'express-session';
import { createClient } from 'redis';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.production.env'
      : '.development.env',
  ),
});

declare module 'express-session' {
  export interface SessionData {
    userEmail: string;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const RedisStore = createRedisStore(session);
  const redisHost: string = process.env.REDIS_HOST;
  const redisPort: number = parseInt(process.env.REDIS_PORT);
  const redisClient = createClient({
    socket: { host: redisHost, port: redisPort },
  });

  redisClient.on('error', (err) => console.error(err));
  redisClient.connect();

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET,
      resave: false, //세션이 수정되지 않아도 지속적으로 저장하게 하는 옵션
      saveUninitialized: false, //초기화되지 않는 세션을 저장하게 함
      cookie: {
        maxAge: 60 * 60 * 24 * 30, //30일
        httpOnly: true,
        sameSite: 'strict',
        // secure: isProdEnv() ?
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(4000);
}
bootstrap();
