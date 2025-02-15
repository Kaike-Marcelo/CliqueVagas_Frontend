import { apiFetch } from './api';
import {
  CreateUserDto,
  UpdateUserDto,
  AuthenticationDto,
  LoginResponseDto,
  GetUserWithAddressDto,
  UserModel,
} from './types/User';

export async function getUsers(): Promise<UserModel[]> {
  return apiFetch<UserModel[]>('/user/all', 'GET');
}

export async function getUserById(
  id: number,
  token: string
): Promise<UserModel> {
  return apiFetch<UserModel>(`/user/${id}`, 'GET', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function createUser(
  user: CreateUserDto,
  token: string
): Promise<number> {
  return apiFetch<number>('/user', 'POST', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
}

export async function updateUser(
  id: number,
  user: UpdateUserDto,
  token: string
): Promise<void> {
  await apiFetch<void>(`/user/${id}`, 'PUT', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
}

export async function deleteUser(id: number, token: string): Promise<void> {
  await apiFetch<void>(`/user/${id}`, 'DELETE', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export async function getUserProfile(
  token: string
): Promise<GetUserWithAddressDto> {
  return apiFetch<GetUserWithAddressDto>('/profile', 'GET', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getUserProfileByEmail(
  email: string,
  token: string
): Promise<GetUserWithAddressDto> {
  return apiFetch<GetUserWithAddressDto>(`/profile/${email}`, 'GET', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
