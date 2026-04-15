import cors from "@fastify/cors";
import Fastify from "fastify";
import { apiRoutes } from "../routes/api.js";
import { healthRoutes } from "../routes/health.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: process.env.FRONTEND_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  });

  await app.register(healthRoutes);
  await app.register(apiRoutes);

  return app;
}
