export interface RegisterUserDTO {
    name: string;
    email: string;
    password: string;
    email_verified?: boolean;
}

export interface LoginRequest {
    email: string;
    password: string;
}