import { apiFetch } from './api';
import { Certificate, CertificateDto } from './types/Certificate';

export async function getCertificates(token: string): Promise<Certificate[]> {
  return apiFetch<Certificate[]>('/certificates', 'GET', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function addCertificate(
  data: FormData,
  token: string
): Promise<number> {
  const response = await apiFetch<{ id: number }>(`/certificates`, 'POST', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  return response.id;
}

export async function updateCertificate(
  data: FormData,
  token: string
): Promise<void> {
  await apiFetch<void>(`/certificates`, 'PUT', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
}

export async function deleteCertificate(
  certificateId: number,
  token: string
): Promise<void> {
  return apiFetch<void>(
    `/certificates?certificateId=${certificateId}`,
    'DELETE',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
