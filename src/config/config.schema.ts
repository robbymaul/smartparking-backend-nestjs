import { z } from 'zod';
import * as process from 'node:process';

const envSchema = z.object({
  APP_NAME: z.string(),
  APP_VERSION: z.string(),
  PORT: z.string().default('3000'),
  HEADER_API: z.string().default('/api/v1'),
  NODE_ENV: z
    .enum(['test', 'development', 'staging', 'production'])
    .default('development'),
  LOG_LEVEL: z
    .enum(['debug', 'info', 'warn', 'error', 'testing'])
    .default('debug'),
  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.coerce.number(),
  JWT_ALGORITHM: z.string(),
  DATABASE_URL: z.string(),
});

const parseEnvSchema = envSchema.safeParse(process.env);

if (!parseEnvSchema.success) {
  console.error(
    `x invalid env variable schema ${parseEnvSchema.error.format()}`,
  );
  process.exit(1);
}

export const CONFIG = parseEnvSchema.data;
