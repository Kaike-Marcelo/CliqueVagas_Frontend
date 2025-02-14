import { apiFetch } from './api';
import { Company, CreateCompanyDto } from './types/Company';

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
