import {
  createClient,
  RedisClientType,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';
import * as dotenv from 'dotenv';

dotenv.config();

const RedisProvider = {
  provide: 'REDIS_CLIENT',
  useFactory: async (): Promise<
    RedisClientType<RedisModules, RedisFunctions, RedisScripts>
  > => {
    const redisHost: string = process.env.REDIS_HOST;
    const redisPort: number = +process.env.REDIS_PORT;
    const redisClient = createClient({
      socket: { host: redisHost, port: redisPort },
      legacyMode: true,
    });

    redisClient.on('error', (err) => {
      console.error(err);
    });

    await redisClient.connect();
    return redisClient;
  },
};

export default RedisProvider;
