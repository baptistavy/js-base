import { FastifyInstance } from "fastify";
import * as userController from "../controllers/user.controllers";

export default async function userRoutes(app: FastifyInstance) {
  app.post("/", userController.Register);
  app.post("/email-verify", userController.EmailVerification);
  app.post("/login", userController.Login);
}