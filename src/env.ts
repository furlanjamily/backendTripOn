import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url('postgresql://nodedeploy_pg_1708_user:B6C69UavWUA9Lk6PYtMmhYyNMVESLagf@dpg-crn3m2g8fa8c73892mr0-a/nodedeploy_pg_1708'),
  WEB_BASE_URL: z.string().url('https://journey-chi-ten.vercel.app'),
  PORT: z.number().int('PORT must be an integer').default(3333), // Primeiro verifica se é um inteiro, depois define o valor padrão
});

export const env = envSchema.parse(process.env);
