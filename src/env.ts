import express from 'express';
import { z } from 'zod';

const app = express();

// Definição do schema para variáveis de ambiente
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url().default('http://localhost:3333'),
  PORT: z.string()
    .transform((val) => parseInt(val, 10)) // Converte para número
    .refine((val) => !isNaN(val), {
      message: "PORT must be a valid number",
    })
    .default('3333'),
});

// Defina suas variáveis de ambiente corretamente
process.env.DATABASE_URL = "postgresql://nodedeploy_pg_1708_user:B6C69UavWUA9Lk6PYtMmhYyNMVESLagf@dpg-crn3m2g8fa8c73892mr0-a/nodedeploy_pg_1708";
process.env.WEB_BASE_URL = "https://journey-chi-ten.vercel.app";
process.env.API_BASE_URL = "http://localhost:3333";
process.env.PORT = "3334"; // Mantido como string para simular o ambiente

// Validação das variáveis de ambiente
const parsedEnv = envSchema.parse(process.env);

// Usando o valor validado para a porta
const port = parsedEnv.PORT;

// Iniciando o servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

// Exportando o ambiente validado
export const env = parsedEnv;
