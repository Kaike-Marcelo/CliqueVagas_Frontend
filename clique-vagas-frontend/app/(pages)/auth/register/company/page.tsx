'use client';

import { useRouter } from 'next/navigation';
import { createCompany } from '@/app/_services/companyService';
import { CreateCompanyDto } from '@/app/_services/types/Company';
import CompanyRegisterForm from '@/app/_components/auth/CompanyRegisterForm';
import RegisterPageLayout from '@/app/_components/auth/RegisterPageLayout';
import { useState } from 'react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/app/_components/ui/alert';

export default function CompanyRegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (company: CreateCompanyDto) => {
    console.log('handleRegister called with:', company);
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      console.log('Creating company...');
      await createCompany(company);
      console.log('Company created successfully');
      setSuccess(
        'Cadastro realizado com sucesso! Redirecionando para login...'
      );
      setTimeout(() => {
        router.push('/auth/login');
      }, 5000); // Redireciona após 3 segundos
    } catch (err) {
      console.error('Error creating company:', err);
      setError('Falha ao cadastrar empresa. Tente novamente.');
    } finally {
      setIsLoading(false);
      console.log('handleRegister finished');
    }
  };

  return (
    <RegisterPageLayout
      title="Cadastro de Empresa"
      imageSrc="/img/registerCompany-illustration.png"
    >
      <CompanyRegisterForm onRegister={handleRegister} />
      <div className="mt-1">
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="default" className="bg-green-500">
            <AlertTitle className="text-white">Sucesso</AlertTitle>
            <AlertDescription className="text-white">
              {success}
            </AlertDescription>
          </Alert>
        )}
        {isLoading && <p>Carregando...</p>}
      </div>
    </RegisterPageLayout>
  );
}
