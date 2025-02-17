export interface Certificate {
  id: number;
  name: string;
  description: string;
  institution: string;
  issuanceDate: string;
  creditHours: number;
  file: Blob | string;
}

export interface CertificateDto {
  name: string;
  description: string;
  institution: string;
  issuanceDate: string;
  creditHours: number;
  file: Blob | string;
}
