import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.services";

export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await userService.createUser(req.body.name);
    res.status(201).json(user);
  } catch (err) {
    next(err);
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