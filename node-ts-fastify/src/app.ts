import Fastify from "fastify";
import userRoutes from "./routes/user.routes";

export function buildApp() {
  const app = Fastify({
    logger: true,
  });

  app.get("/", async () => {
    return {
      status: "ok",
      message: "Fastify + TypeScript API is running",
    };
  });

  app.register(userRoutes, { prefix: "/users" });

  return app;
}