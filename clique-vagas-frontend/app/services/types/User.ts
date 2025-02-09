export type Authority = {
  authority: string;
};

export type User = {
  userId: number;
  firstName: string;
  lastName: string;
  urlImageProfile: string | null;
  role: 'INTERN' | 'USER' | 'ADMIN'; // Defina outros possíveis papéis se houver
  cpf: string;
  phone: string;
  email: string;
  password: string;
  createdAt: string; // Pode ser tratado como Date no frontend
  updatedAt: string;
  authorities: Authority[];
  username: string;
  enabled: boolean;
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
};
