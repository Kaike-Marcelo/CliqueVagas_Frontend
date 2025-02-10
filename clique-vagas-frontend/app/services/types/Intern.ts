export interface Intern {
  id: number;
  userId: {
    userId: number;
    firstName: string;
    lastName: string;
    urlImageProfile: string | null;
    role: string;
    phone: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    username: string;
    authorities: { authority: string }[];
    enabled: boolean;
    accountNonLocked: boolean;
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
  };
  dateOfBirth: string;
  sex: string;
  educationalInstitution: string;
  areaOfInterest: string;
  yearOfEntry: string;
  expectedGraduationDate: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}
