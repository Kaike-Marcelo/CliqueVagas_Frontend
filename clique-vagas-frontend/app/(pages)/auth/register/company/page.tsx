'use client';

import { useRouter } from 'next/navigation';
import { createCompany } from '@/app/_services/companyService';
import { CreateCompanyDto } from '@/app/_services/types/Company';
import CompanyRegisterForm from '@/app/_components/auth/CompanyRegisterForm';
import RegisterPageLayout from '@/app/_components/auth/RegisterPageLayout';

export default function CompanyRegisterPage() {
  const router = useRouter();

  const handleRegister = async (company: CreateCompanyDto) => {
    try {
      await createCompany(company);
      router.push('/auth/login'); // Redirecione para a página de login
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <RegisterPageLayout
      title="Cadastro de Empresa"
      imageSrc="/img/registerCompany-illustration.png"
    >
      <CompanyRegisterForm onRegister={handleRegister} />
    </RegisterPageLayout>
  );
}
