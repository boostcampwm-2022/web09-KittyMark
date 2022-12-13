import { Global, Module } from '@nestjs/common';
import RedisProvider from './redisProvider';

@Global()
@Module({
  providers: [RedisProvider],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
