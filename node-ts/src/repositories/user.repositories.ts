import pool from "../config/database";
import { User } from "../models/user.model";

export async function create(name: string): Promise<User> {
  const result = await pool.query<User>(
    "INSERT INTO users (name) VALUES ($1) RETURNING id, name",
    [name]
  );

  return result.rows[0];
}

export async function getAll(): Promise<User[]> {
  const result = await pool.query<User>(
    "SELECT id, name FROM users ORDER BY id"
  );

  return result.rows;
}