import { z } from 'zod';


export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  DATABASE_URL: z.url().refine((url) => {
    return (
      url.startsWith('postgres://') ||
      url.startsWith('postgresql://')
    );
  }, { message: 'DATABASE_URL must be a valid postgres url' }),
  FRONTEND_URL: z.url(),
  AI_SERVICE_URL: z.url(),
  AI_REQUEST_TIMEOUT: z.coerce.number().int().min(1).max(60000).default(5000),
  JWT_ACCESS_SECRET: z.string().min(32, 'JWT_ACCESS_SECRET must be at least 32 characters long'),
  JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters long'),
});


export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: Record<string, unknown>): Env {
  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error('Invalid environment variables:', z.prettifyError(result.error));
    throw new Error('Invalid environment variables');
  }
  return result.data;
}
