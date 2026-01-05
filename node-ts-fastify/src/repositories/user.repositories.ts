import { pool } from "../config/database";
import * as model from "../models/user.model";
import * as dto from "../dto/user.dto";

export async function GetUserByEmail(
  email: string
): Promise<model.User | null> {
  const result = await pool.query<model.User>(
    `SELECT id, name, email, password, email_verified
     FROM users
     WHERE email = $1
     LIMIT 1`,
    [email]
  );

  return result.rows[0] ?? null;
}

export async function Create(user: dto.RegisterRequest): Promise<model.User> {
  const result = await pool.query<model.User>(
    `INSERT INTO users (name, email, password, email_verified)
     VALUES ($1, $2, $3, $4)
     RETURNING id, name, email, email_verified`,
    [user.name, user.email, user.password, user.email_verified]
  );

  return result.rows[0];
}

export async function VerifyEmail(email: string): Promise<model.User> {
  const result = await pool.query<model.User>(
    `UPDATE users SET email_verified = true WHERE email = $1 RETURNING id, name`,
    [email]
  );

  return result.rows[0];
}

export async function GetAll(): Promise<model.User[]> {
  const result = await pool.query<model.User>(
    "SELECT id, name FROM users ORDER BY id"
  );

  return result.rows;
}

export async function GetUserById(
  id: string
): Promise<model.User | null> {
  const result = await pool.query<model.User>(
    `SELECT id, name, email, email_verified
     FROM users
     WHERE id = $1
     LIMIT 1`,
    [id]
  );

  return result.rows[0] ?? null;
}