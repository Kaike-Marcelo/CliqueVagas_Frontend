'use client';

import { useRouter } from 'next/navigation';
import { createIntern } from '@/app/_services/internService';
import { CreateInternDto } from '@/app/_services/types/Intern';
import InternRegisterForm from '@/app/_components/auth/InternRegisterForm';
import RegisterPageLayout from '@/app/_components/auth/RegisterPageLayout';
import { useState } from 'react';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/app/_components/ui/alert';

export default function InternRegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleRegister = async (intern: CreateInternDto) => {
    console.log('handleRegister called with:', intern);
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      console.log('Creating intern...');
      await createIntern(intern);
      console.log('Intern created successfully');
      setSuccess(
        'Cadastro realizado com sucesso! Redirecionando para login...'
      );
      setTimeout(() => {
        router.push('/auth/login');
      }, 5000); // Redireciona após 3 segundos
    } catch (err) {
      console.error('Error creating intern:', err);
      setError('Falha ao cadastrar estagiário. Tente novamente.');
    } finally {
      setIsLoading(false);
      console.log('handleRegister finished');
    }
  };

  return (
    <RegisterPageLayout
      title="Cadastro de Estagiário"
      imageSrc="/img/registerIntern-illustration.png"
    >
      <InternRegisterForm onRegister={handleRegister} />
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
