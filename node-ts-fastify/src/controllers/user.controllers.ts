import { FastifyRequest, FastifyReply } from "fastify";
import * as userService from "../services/user.services";
import * as dto from "../dto/user.dto";
import * as respBuilder from "../lib/response.builder";

export async function Register(
  request: FastifyRequest<{ Body: dto.RegisterRequest }>,
  reply: FastifyReply
) {
  const user = await userService.Register(request.body);

  return reply.status(201).send(respBuilder.RespondSuccess({message: "user registered successfully, please verify your email", data: user}));
}

export async function EmailVerification(
  request: FastifyRequest<{ Body: dto.EmailVerificationRequest }>,
  reply: FastifyReply
) {
  const user = await userService.EmailVerification(request.body);

  const response = {
    id: user.id,
    name: user.name,
  }

  return reply.status(201).send(respBuilder.RespondSuccess({message: "email verified", data: response}));
}

export async function Login(
  request: FastifyRequest<{ Body: dto.LoginRequest }>,
  reply: FastifyReply
) {

  if (!request.body.email || !request.body.password) {
    return reply.status(400).send(respBuilder.RespondError({message: "both fields are required"}));
  }

  const user = await userService.Login(request.body);

  return reply.status(201).send(respBuilder.RespondSuccess({message: "login successful", data: user}));
}