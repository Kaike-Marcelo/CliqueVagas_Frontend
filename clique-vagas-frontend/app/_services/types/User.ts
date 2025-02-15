import { Address } from './Address';
import { SkillIntermediateWithIdDto } from './Skill';
import { Certificate } from './Certificate';

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'INTERN' | 'COMPANY' | 'ADMIN';
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'INTERN' | 'COMPANY';
  password: string;
  description: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: 'INTERN' | 'COMPANY';
  password?: string;
  description?: string;
}

export interface AuthenticationDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
}

// Interface para o usuário com endereço no perfil
export interface GetUserWithAddressDto {
  address: Address;
  user: UserModel;
  intern?: {
    dateOfBirth: string;
    sex: 'M' | 'F' | 'OTHER';
    cpf: string;
    educationalInstitution: string;
    areaOfInterest: string;
    yearOfEntry: number;
    expectedGraduationDate: string;
  };
  company?: {
    companyName: string;
    cnpj: string;
    telephoneResponsible: string;
    sectorOfOperation: string;
    websiteLink: string;
  };
  skillIntern?: SkillIntermediateWithIdDto[];
  certificates?: Certificate[];
}

// Interface para o modelo de usuário no perfil
export interface UserModel {
  userId: number;
  firstName: string;
  lastName: string;
  urlImageProfile: string;
  role: 'ADMIN' | 'INTERN' | 'COMPANY';
  phone: string;
  email: string;
  password: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  authorities: GrantedAuthority[];
  username: string;
  enabled: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  accountNonLocked: boolean;
}

// Interface para as autoridades concedidas ao usuário
export interface GrantedAuthority {
  authority: string;
}
