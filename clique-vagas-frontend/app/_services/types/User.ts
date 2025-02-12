export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'INTERN' | 'COMPANY';
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'INTERN' | 'COMPANY';
  password: string;
  description: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: 'INTERN' | 'COMPANY';
  password?: string;
  description?: string;
  enabled?: boolean;
}

export interface AuthenticationDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}
