import { User } from './User';

export interface Intern {
  id: number;
  user: User; // Referência direta ao usuário
  dateOfBirth: string; // ISO 8601
  sex: 'M' | 'F' | 'OTHER'; // Pode ser expandido se necessário
  educationalInstitution: string;
  areaOfInterest: string;
  yearOfEntry: number;
  expectedGraduationDate: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInternDto {
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
  intern: {
    dateOfBirth: string;
    sex: 'M' | 'F' | 'OTHER';
    cpf: string;
    educationalInstitution: string;
    areaOfInterest: string;
    yearOfEntry: number;
    expectedGraduationDate: string;
  };
}

export interface PostInternDto {
  dateOfBirth: string;
  sex: 'M' | 'F' | 'OTHER';
  cpf: string;
  educationalInstitution: string;
  areaOfInterest: string;
  yearOfEntry: number;
  expectedGraduationDate: string;
}
