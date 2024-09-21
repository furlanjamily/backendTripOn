import { PrismaClient } from "@prisma/client";
import fastify from "fastify";
import { z } from "zod";

const app = fastify();
const prisma = new PrismaClient();

app.get("/users", async () => {
  const users = await prisma.user.findMany();
  return { users };
});

app.post("/users", async (request, reply) => {
  const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
  });

  const { name, email } = createUserSchema.parse(request.body);

  await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return reply.status(201).send();
});

// Garantindo que a porta seja um número
const port = Number(process.env.PORT) || 3333; // Converte para número
app.listen({ host: "0.0.0.0", port }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando na porta ${port}`);
  console.log("HTTP Server Running");
});
