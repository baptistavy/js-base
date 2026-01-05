export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  email_verified: boolean;
}

export interface EmailVerificationRequest {
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}