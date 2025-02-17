import { User } from './User';

export interface Company {
  id: number;
  user: User;
  companyName: string;
  cnpj: string;
  telephoneResponsible: string;
  sectorOfOperation: string;
  websiteLink: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyDto {
  address: {
    cep: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
  };
  user: {
    firstName: string;
    lastName: string;
    role: 'ADMIN' | 'INTERN' | 'COMPANY';
    phone: string;
    email: string;
    password: string;
    description: string;
  };
  company: {
    companyName: string;
    cnpj: string;
    telephoneResponsible: string;
    sectorOfOperation: string;
    websiteLink: string;
  };
}

export interface UpdateCompanyDto {
  companyName?: string;
  cnpj?: string;
  telephoneResponsible?: string;
  sectorOfOperation?: string;
  websiteLink?: string;
}
