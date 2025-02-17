'use client';

import Link from 'next/link';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent } from '@/app/_components/ui/card';
import { HomeIcon } from 'lucide-react';
import { Label } from '@/app/_components/ui/label';

export default function Register() {
  return (
    <main className="min-h-screen bg-[#0B1B2B] flex items-center justify-center p-4">
      <Card className="grid lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[60vh]">
        <div className="relative hidden lg:flex items-center justify-center bg-muted bg-gradient-to-r from-orange-400 to-orange-500">
          <img
            src="/img/register-illustration.png"
            alt="Register Illustration"
            className="h-3/4 w-3/4 object-contain"
          />
          <Link
            href="/home"
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
        <CardContent className="flex-1 p-8">
          <div className="flex justify-center items-center gap-2 mb-6">
            <img
              src="/img/logo.png"
              alt="Clique Vagas Logo"
              className="h-10 w-10 object-contain bg-primary rounded-sm"
            />
            <Label className="text-2xl font-bold">CLIQUE VAGAS</Label>
          </div>
          <div className="flex justify-stretch mb-6 space-x-7">
            <Link href="/auth/login">
              <Button className="">←</Button>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              Escolha o tipo de cadastro
            </h2>
          </div>

          <div className="py-14">
            <div className="flex flex-col justify-center gap-3 mb-4">
              <Link href="/auth/register/intern">
                <Button className="w-full text-2xl p-8">Estagiário</Button>
              </Link>
              <Link href="/auth/register/company">
                <Button className="w-full text-2xl p-8">Empresa</Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
