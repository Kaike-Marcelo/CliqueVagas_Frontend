import { apiFetch } from './api';
import { Address } from './types/Address';
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

export async function updateUser(
  user: UpdateUserDto,
  token: string
): Promise<void> {
  await apiFetch<void>(`/user`, 'PUT', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
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
  email: string
): Promise<GetUserWithAddressDto> {
  return apiFetch<GetUserWithAddressDto>(`/profile/${email}`, 'GET');
}

export async function putUserAddressById(
  id: number,
  address: Address
): Promise<GetUserWithAddressDto> {
  return apiFetch<GetUserWithAddressDto>(`/address/${id}`, 'PUT', {
    body: JSON.stringify(address),
  });
}
