import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as session from 'express-session';
import * as createRedisStore from 'connect-redis';
import redisProvider from './redis/redisProvider';

dotenv.config();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const RedisStore = createRedisStore(session);
    const redisClient = await redisProvider.useFactory();

    app.use(
        session({
            store: new RedisStore({ client: redisClient }),
            name: 'kittymark',
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60 * 60 * 24 * 30 * 1000,
                httpOnly: true,
                sameSite: 'strict',
            },
        }),
    );

    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    await app.listen(4000);
}
bootstrap();
