import { apiFetch } from './api';
import { Company, CreateCompanyDto, UpdateCompanyDto } from './types/Company';

export const getCompanies = async (): Promise<Company[]> => {
  return apiFetch<Company[]>('/company');
};

export const createCompany = async (
  company: CreateCompanyDto
): Promise<number> => {
  return apiFetch<number>('/company', 'POST', {
    body: JSON.stringify(company),
  });
};

export const deleteCompany = async (id: number): Promise<void> => {
  await apiFetch<void>(`/company/${id}`, 'DELETE');
};

export const updateCompany = async (
  company: UpdateCompanyDto,
  token: string
): Promise<void> => {
  await apiFetch<void>(`/company`, 'PUT', {
    body: JSON.stringify(company),
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
