import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url().default('http://localhost:3333'), // Adicione esta linha
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

// Defina suas variáveis de ambiente corretamente
process.env.DATABASE_URL = "postgresql://nodedeploy_pg_1708_user:B6C69UavWUA9Lk6PYtMmhYyNMVESLagf@dpg-crn3m2g8fa8c73892mr0-a/nodedeploy_pg_1708";
process.env.WEB_BASE_URL = "https://journey-chi-ten.vercel.app";
process.env.API_BASE_URL = "http://localhost:3333";
process.env.PORT = "3333";

export const env = envSchema.parse(process.env);
