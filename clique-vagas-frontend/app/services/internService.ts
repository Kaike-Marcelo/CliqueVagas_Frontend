import { apiFetch } from './api';
import { Intern } from './types/Intern';

export const getInterns = async (): Promise<Intern[]> => {
  return apiFetch<Intern[]>('/intern');
};
