import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url('postgresql://nodedeploy_pg_1708_user:B6C69UavWUA9Lk6PYtMmhYyNMVESLagf@dpg-crn3m2g8fa8c73892mr0-a/nodedeploy_pg_1708'),
  WEB_BASE_URL: z.string().url('https://journey-chi-ten.vercel.app'),
  PORT: z.string()
    .transform((val) => {
      const port = parseInt(val, 10);
      if (isNaN(port)) {
        throw new Error('PORT must be a valid number');
      }
      return port;
    })
    .default('3333'), // Define o valor padrão como string
});

export const env = envSchema.parse(process.env);
