import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as session from 'express-session';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.production.env'
      : '.development.env',
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false, //세션이 수정되지 않아도 지속적으로 저장하게 하는 옵션
      saveUninitialized: false, //초기화되지 않는 세션을 저장하게 함
      cookie: {
        maxAge: 60 * 60 * 24 * 30, //30일
        httpOnly: true,
        sameSite: 'strict',
        // secure: true,
      },
      name: 'kittymark.sid',
    }),
  );
  await app.listen(4000);
}
bootstrap();
