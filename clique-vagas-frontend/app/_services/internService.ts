import { apiFetch } from './api';
import { Intern, CreateInternDto, PostInternDto } from './types/Intern';

export const getInterns = async (): Promise<Intern[]> => {
  return apiFetch<Intern[]>('/intern/all');
};

export const getInternById = async (id: number): Promise<Intern> => {
  return apiFetch<Intern>(`/intern/${id}`, 'GET');
};

export const createIntern = async (
  intern: CreateInternDto
): Promise<number> => {
  return apiFetch<number>('/intern', 'POST', {
    body: JSON.stringify(intern),
  });
};

export const updateIntern = async (
  intern: PostInternDto,
  token: string
): Promise<void> => {
  await apiFetch<void>(`/intern`, 'PUT', {
    body: JSON.stringify(intern),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const deleteIntern = async (id: number): Promise<void> => {
  await apiFetch<void>(`/intern/${id}`, 'DELETE');
};
