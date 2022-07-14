import { registerAs } from '@nestjs/config';

export default registerAs('rate-limit', () => ({
  ttl: process.env.RATE_LIMIT_TTL,
  limit: process.env.RATE_LIMIT_LIMIT,
}));
