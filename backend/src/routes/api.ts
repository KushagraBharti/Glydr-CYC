import type { FastifyPluginAsync } from "fastify";
import { PlatformService } from "../services/platform-service.js";

export const apiRoutes: FastifyPluginAsync = async (app) => {
  const service = new PlatformService();

  app.get("/api/home", async () => service.getHomeFeed());

  app.get("/api/games", async () => ({
    items: await service.listGames(),
  }));

  app.get("/api/games/:slug", async (request, reply) => {
    const game = await service.getGame((request.params as { slug: string }).slug);
    if (!game) {
      return reply.code(404).send({ message: "Game not found" });
    }
    return game;
  });

  app.get("/api/profiles", async () => ({
    items: await service.listProfiles(),
  }));

  app.get("/api/profiles/:slug", async (request, reply) => {
    const profile = await service.getProfile((request.params as { slug: string }).slug);
    if (!profile) {
      return reply.code(404).send({ message: "Profile not found" });
    }
    return profile;
  });

  app.get("/api/profiles/:slug/related", async (request) => ({
    items: await service.getRelatedProfiles((request.params as { slug: string }).slug),
  }));

  app.post("/api/imports", async (request, reply) => {
    const payload = request.body as { profileSlug?: unknown };
    if (typeof payload.profileSlug !== "string" || payload.profileSlug.length === 0) {
      return reply.code(400).send({ message: "profileSlug is required" });
    }
    const receipt = await service.createImport({ profileSlug: payload.profileSlug });

    if (!receipt) {
      return reply.code(404).send({ message: "Profile not found" });
    }

    return receipt;
  });

  app.get("/api/imports/:id", async (request, reply) => {
    const receipt = await service.getImport((request.params as { id: string }).id);
    if (!receipt) {
      return reply.code(404).send({ message: "Import not found" });
    }
    return receipt;
  });

  app.get("/api/session", async () => service.getSession());

  app.post("/api/dev/auth-bypass", async (request) => {
    const payload = request.body as { enabled?: unknown };
    if (typeof payload.enabled !== "boolean") {
      return { message: "enabled must be a boolean" };
    }
    return service.toggleAuthBypass({ enabled: payload.enabled });
  });
};
