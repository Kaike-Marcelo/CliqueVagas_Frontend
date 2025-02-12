import { apiFetch } from './api';
import {
  User,
  CreateUserDto,
  UpdateUserDto,
  AuthenticationDto,
  LoginResponseDto,
} from './types/User';

export async function getUsers(): Promise<User[]> {
  return apiFetch<User[]>('/user/all');
}

export async function getUserById(id: number): Promise<User> {
  return apiFetch<User>(`/user/${id}`, 'GET');
}

export async function createUser(user: CreateUserDto): Promise<number> {
  return apiFetch<number>('/user', 'POST', {
    body: JSON.stringify(user),
  });
}

export async function updateUser(
  id: number,
  user: UpdateUserDto
): Promise<void> {
  await apiFetch<void>(`/user/${id}`, 'PUT', {
    body: JSON.stringify(user),
  });
}

export async function deleteUser(id: number): Promise<void> {
  await apiFetch<void>(`/user/${id}`, 'DELETE');
}

export async function registerUser(user: CreateUserDto): Promise<void> {
  await apiFetch<void>('/auth/register', 'POST', {
    body: JSON.stringify(user),
  });
}

export async function loginUser(
  credentials: AuthenticationDto
): Promise<LoginResponseDto> {
  return apiFetch<LoginResponseDto>('/auth/login', 'POST', {
    body: JSON.stringify(credentials),
  });
}

export async function getUserProfile(id: number): Promise<User> {
  return apiFetch<User>(`/profile/${id}`, 'GET');
}
