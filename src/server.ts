import fastify from 'fastify';
import cors from '@fastify/cors';
import { createTrip } from './routes/create-trip';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import { confirmTrip } from './routes/confirm-trip';
import { confirmParticipants } from './routes/confirm-participant';
import { createActivity } from './routes/create-activity';
import { getActivities } from './routes/get-activities';
import { createLink } from './routes/create-link';
import { getLinks } from './routes/get-links';
import { getParticipants } from './routes/get-participants';
import { createInvite } from './routes/create-invite';
import { updateTrip } from './routes/update-trip';
import { getTripDetails } from './routes/get-trip-details';
import { getParticipant } from './routes/get-participant';
import { errorHandler } from './error-handler';
import { z } from 'zod';

// Definição do schema para variáveis de ambiente
const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  WEB_BASE_URL: z.string().url(),
  API_BASE_URL: z.string().url().default('http://localhost:3333'),
  PORT: z.string()
    .transform((val) => parseInt(val, 10)) // Converte para número aqui
    .refine((val) => !isNaN(val), {
      message: "PORT must be a number",
    })
    .default('3333'),
});

// Defina suas variáveis de ambiente corretamente
process.env.DATABASE_URL = "postgresql://nodedeploy_pg_1708_user:B6C69UavWUA9Lk6PYtMmhYyNMVESLagf@dpg-crn3m2g8fa8c73892mr0-a/nodedeploy_pg_1708";
process.env.WEB_BASE_URL = "https://journey-chi-ten.vercel.app";
process.env.API_BASE_URL = "http://localhost:3333";
process.env.PORT = "3333"; // Mantido como string aqui para simular o ambiente

// Validação das variáveis de ambiente
const parsedEnv = envSchema.parse(process.env);

// Inicializando o Fastify
const app = fastify();

app.register(cors, {
  origin: '*',
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);

// Registrando as rotas
app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipants);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvite);
app.register(updateTrip);
app.register(getTripDetails);
app.register(getParticipant);

// Usando o valor validado para a porta
const port = parsedEnv.PORT;

// Alteração: Usar a nova assinatura do listen
app.listen({ port, host: '0.0.0.0' }).then(() => {
  console.log(`Server running at http://localhost:${port}/`);
}).catch(err => {
  console.error('Error starting server:', err);
});
