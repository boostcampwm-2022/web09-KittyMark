import { createClient } from 'redis';

const redisHost: string = process.env.REDIS_HOST;
const redisPort: number = parseInt(process.env.REDIS_PORT);
const redisClient = createClient({
  socket: { host: redisHost, port: redisPort },
});

redisClient.on('error', (err) => {
  console.error(err);
});

redisClient.connect();

export { redisClient };
