import { apiFetch } from './api';
import { User } from './types/User';

export async function getUsers(): Promise<User[]> {
  return apiFetch<User[]>('/user');
}
