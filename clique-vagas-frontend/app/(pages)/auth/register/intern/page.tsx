'use client';

import { useRouter } from 'next/navigation';
import { createIntern } from '@/app/_services/internService';
import { CreateInternDto } from '@/app/_services/types/Intern';
import InternRegisterForm from '@/app/_components/auth/InternRegisterForm';
import RegisterPageLayout from '@/app/_components/auth/RegisterPageLayout';

export default function InternRegisterPage() {
  const router = useRouter();

  const handleRegister = async (intern: CreateInternDto) => {
    try {
      await createIntern(intern);
      router.push('/auth/login'); // Redirecione para a página de login
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <RegisterPageLayout
      title="Cadastro de Estagiário"
      imageSrc="/img/registerIntern-illustration.png"
    >
      <InternRegisterForm onRegister={handleRegister} />
    </RegisterPageLayout>
  );
}
