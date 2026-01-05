import * as userRepo from "../repositories/user.repositories";
import { AppError } from "../errors/errors";
import { ErrorCode } from "../errors/error.code";
import * as dto from "../dto/user.dto";
import * as model from "../models/user.model";
import * as passUtils from "../utils/password.utils";

export async function Register(input: dto.RegisterRequest) {
  const existing = await userRepo.GetUserByEmail(input.email);

  if (existing) {
    throw new AppError(
      "User already exists",
      409,
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  const hashedPassword = await passUtils.hashPassword(input.password)

  const req : dto.RegisterRequest = {
    name: input.name,
    email: input.email,
    password: hashedPassword,
    email_verified: false,
  }

  return userRepo.Create(req);
}

export async function EmailVerification(input: dto.EmailVerificationRequest) {
  const existing = await userRepo.GetUserByEmail(input.email);

  if (!existing) {
    throw new AppError(
      "user not found",
      404,
      ErrorCode.USER_NOT_FOUND
    );
  }

  return userRepo.VerifyEmail(input.email);
}

export async function Login(input: dto.LoginRequest): Promise<model.User>{
  const existing = await userRepo.GetUserByEmail(input.email);

  if (!existing) {
    throw new AppError(
      "user not found",
      404,
      ErrorCode.USER_NOT_FOUND
    );
  }

  if (!existing.email_verified) {
     throw new AppError(
      "please verify your email first",
      401,
      ErrorCode.FORBIDDEN
    );
  }

  console.log({
    inputPassword: input.password,
    dbPassword: existing.password,
  });

  const isValid = await passUtils.comparePassword(input.password, existing.password)
  if (!isValid) {
    throw new AppError(
      "invalid credential",
      401,
      ErrorCode.INVALID_CREDENTIALS
    );
  }

  const user: model.User = {
    id: existing.id,
    name: existing.name,
    email: input.email,
    password: existing.password,
    email_verified: existing.email_verified,
  }

  return user;
}