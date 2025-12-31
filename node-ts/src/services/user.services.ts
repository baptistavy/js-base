import * as userRepo from "../repositories/user.repositories";
import { User } from "../models/user.model";

export async function createUser(name: string): Promise<User> {
  if (!name) {
    throw new Error("Name is required");
  }

  return userRepo.create(name);
}

export async function getUsers(): Promise<User[]> {
  return userRepo.getAll();
}