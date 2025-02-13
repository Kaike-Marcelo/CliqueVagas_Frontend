'use client';

import Link from 'next/link';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent } from '@/app/_components/ui/card';
import { HomeIcon } from 'lucide-react';
import InternRegisterForm from '@/app/_components/auth/InternRegisterForm';
import { CreateInternDto } from '@/app/_services/types/Intern';
import { useRouter } from 'next/navigation';
import { createIntern } from '@/app/_services/internService';

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
    <main className="min-h-screen bg-[#0B1B2B] flex items-center justify-center">
      <Card className="flex bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[80vh] max-w-[80vw]">
        <div className="relative hidden lg:flex items-center justify-center bg-muted bg-gradient-to-r from-orange-400 to-orange-500">
          <img
            src="/img/registerIntern-illustration.png"
            alt="Register Intern Illustration"
            className="h-4/5 w-4/5 object-contain"
          />
          <Link
            href="/"
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-slate-50 dark:bg-gray-700 rounded-full hover:bg-primary transition-colors duration-300">
              <HomeIcon
                className="text-primary dark:text-primary-foreground hover:text-primary-foreground transition-colors duration-300"
                size={32}
              />
            </div>
          </Link>
        </div>
        <CardContent className="flex flex-col py-8 px-2 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-stretch mb-6 space-x-7">
            <Link href="/auth/register">
              <Button className="">←</Button>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Cadastro de Estagiário
            </h2>
          </div>

          <InternRegisterForm onRegister={handleRegister} />
        </CardContent>
      </Card>
    </main>
  );
}
