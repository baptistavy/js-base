import * as userRepo from "../repositories/user.repositories";
import * as model from "../models/user.model";
import * as dto from "../dto/user.dto";
import * as userUtils from "../utils/user";
import * as errors from "../errors/errors";
import * as errCodes from "../errors/error.code";

export async function createUser(users: dto.RegisterUserDTO): Promise<model.User> {
    const user = await userRepo.getUserByEmail(users.email);
    if (user) {
        throw new errors.AppError("User exists", errCodes.HttpStatus.BAD_REQUEST, errCodes.ErrorCode.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await userUtils.hashPassword(users.password);
    users.password = hashedPassword;

    return userRepo.create(users);
}

export async function verifyEmail(email: string): Promise<model.User> {
    const user = await userRepo.getUserByEmail(email);
    if (!user) {
        throw new errors.AppError("user not found", errCodes.HttpStatus.NOT_FOUND, errCodes.ErrorCode.USER_NOT_FOUND);
    }

    if (!user.email_verified) {
        throw new errors.AppError("email has verified, please login", errCodes.HttpStatus.BAD_REQUEST, errCodes.ErrorCode.INVALID_PAYLOAD);
    }

    return userRepo.verifyEmail(email);
}

export async function login(loginRequest: dto.LoginRequest): Promise<model.User> {
    const user = await userRepo.getUserByEmail(loginRequest.email);
    console.log(user)
    if (!user) {
        throw new errors.AppError("user not found", errCodes.HttpStatus.NOT_FOUND, errCodes.ErrorCode.USER_NOT_FOUND);
    }

    if (!user.email_verified) {
        console.log(user.email_verified)
        throw new errors.AppError("email hasn't been verified yet", errCodes.HttpStatus.UNAUTHORIZED, errCodes.ErrorCode.UNAUTHENTICATED);
    }

    const isPasswordValid = await userUtils.comparePassword(
        loginRequest.password,
        user.password
    );

    if (!isPasswordValid) {
        throw new errors.AppError("password invalid", errCodes.HttpStatus.UNAUTHORIZED, errCodes.ErrorCode.INVALID_CREDENTIALS);
    }

    return user;
}

export async function getUsers(): Promise<model.User[]> {
    return userRepo.getAll();
}
