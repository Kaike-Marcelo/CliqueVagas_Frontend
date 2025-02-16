import { url } from 'inspector';
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

export async function addPhotoUser(
  photo: FormData,
  token: string
): Promise<any> {
  const response = await apiFetch<{ path: string }>(`/user/photo`, 'POST', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: photo,
  });
  console.log('response:', response);
  return response.path;
}

export async function getPhotoProfile(token: string): Promise<string | null> {
  try {
    const response = await fetch('http://localhost:8080/user/photo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      if (response.status === 400) {
        return null;
      }
      const errorData = await response.json();
      throw new Error(`Erro ${response.status}: ${errorData.message}`);
    }

    const blob = await response.blob();
    const file = new File([blob], 'user-photo.png', { type: 'image/png' });
    const url = URL.createObjectURL(file);
    console.log('URL da foto:', url);
    return url;
  } catch (error) {
    console.error('Erro ao obter foto do usuário:', (error as any).message);
    return null;
  }
}
