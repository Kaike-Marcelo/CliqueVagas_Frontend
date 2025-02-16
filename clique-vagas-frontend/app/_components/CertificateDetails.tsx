import React from 'react';
import { Certificate } from '../_services/types/Certificate';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Label } from './ui/label';

interface CertificateDetailsProps {
  certificate: Certificate | null;
}

const CertificateDetails = ({ certificate }: CertificateDetailsProps) => {
  if (!certificate) return null;

  const getFileUrl = (file: any) => {
    if (file instanceof Blob) {
      return URL.createObjectURL(file);
    }
    if (typeof file === 'string') {
      return file;
    }
    return '#';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalhes do Certificado</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label>Nome:</Label> {certificate.name}
        </div>
        <div>
          <Label>Instituição:</Label> {certificate.institution}
        </div>
        <div>
          <Label>Data de Emissão:</Label> {certificate.issuanceDate}
        </div>
        <div>
          <Label>Carga Horária:</Label> {certificate.creditHours} horas
        </div>
        <div>
          <Label>Descrição:</Label> {certificate.description}
        </div>
        {certificate.file && (
          <div>
            <Label>Arquivo:</Label>{' '}
            <a href={getFileUrl(certificate.file)} download>
              Baixar
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CertificateDetails;
