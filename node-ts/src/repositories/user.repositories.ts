import pool from "../config/database";
import * as model from "../models/user.model";
import * as dto from "../dto/user.dto";

export async function create(users: dto.RegisterUserDTO): Promise<model.User> {
  const result = await pool.query<model.User>(
    "INSERT INTO users (name, email, password, email_verified) VALUES ($1, $2, $3, $4) RETURNING id, name",
    [users.name, users.email, users.password, users.email_verified]
  );

  return result.rows[0];
}

export async function verifyEmail(email: string): Promise<model.User> {
  const result = await pool.query<model.User>(
    "UPDATE users SET email_verified = true WHERE email = $1 RETURNING id, name",
    [email]
  );

  return result.rows[0];
}

export async function getUserByEmail(
  email: string
): Promise<model.User | null> {
  const result = await pool.query<model.User>(
    `SELECT id, name, email, password, email_verified
     FROM users
     WHERE email = $1`,
    [email]
  );

  return result.rows[0] ?? null;
}

export async function getAll(): Promise<model.User[]> {
  const result = await pool.query<model.User>(
    "SELECT id, name FROM users ORDER BY id"
  );

  return result.rows;
}