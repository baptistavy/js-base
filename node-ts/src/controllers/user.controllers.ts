import { Request, Response, NextFunction, response } from "express";
import * as userService from "../services/user.services";
import * as userDTO from "../dto/user.dto";
import * as utils from "../utils/response.utils";
import * as errors from "../errors/errors";
import * as errCodes from "../errors/error.code";


export async function createUser(
  req: Request,
  res: Response,
) {
    const dto: userDTO.RegisterUserDTO = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    if (!dto.name || !dto.email || !dto.password) {
      throw new errors.AppError("all fields required", errCodes.HttpStatus.BAD_REQUEST, errCodes.ErrorCode.INVALID_PAYLOAD);
    }
  try {
    const users = await userService.createUser(dto);
    const response = {
      id: users.id,
      name: users.name,
      email: users.email,
    };

    res.status(201).json(utils.successResponse("account created", response));
    
  } catch (err) {
    if (err instanceof errors.AppError) {
        return res.status(err.status).json(
        utils.errorResponse(err.message, err.code)
        );
    }

    return res.status(500).json(
        utils.errorResponse("Internal server error", "INTERNAL_ERROR")
    );
  }
}

export async function verifyEmail(
  req: Request,
  res: Response,
) {
  try {
    const users = await userService.verifyEmail(req.body.email);
    const response = {
      id: users.id,
      name: users.name,
      email: users.email,
    };

    res.status(200).json(utils.successResponse("email verified", response));

  } catch (err) {
    if (err instanceof errors.AppError) {
        return res.status(err.status).json(
        utils.errorResponse(err.message, err.code)
        );
    }

    return res.status(500).json(
        utils.errorResponse("Internal server error", "INTERNAL_ERROR")
    );
  }
}

export async function login(
  req: Request,
  res: Response,
) {
  try {
    const users = await userService.login(req.body);
    res.status(200).json(utils.successResponse("login successful", null));
    
  } catch (err) {
     if (err instanceof errors.AppError) {
        return res.status(err.status).json(
        utils.errorResponse(err.message, err.code)
        );
    }

    return res.status(500).json(
        utils.errorResponse("Internal server error", "INTERNAL_ERROR")
    );
  }
}


export async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
}