import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BriefcaseIcon, HomeIcon, SearchIcon, UserIcon } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import Link from 'next/link';
import { ThemeProvider } from 'next-themes';
import { ModeToggle } from '@/app/_components/ModeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Clique Vagas',
  description:
    'Clique Vagas é uma plataforma de vagas de emprego para estagiarios.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system">
          <header className="flex justify-between items-center p-1 px-6 bg-sky-950 text-white">
            <div className="max-w-6xl mx-auto flex justify-between w-full">
              <div className="flex items-center space-x-4">
                <img src="img/logo.png" width={40} height={40} />
                <div className="flex items-center space-x-2">
                  <SearchIcon />
                  <Input
                    type="text"
                    placeholder="Pesquisar..."
                    className="p-2 rounded bg-gray-700 text-white"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="flex flex-col items-center space-x-2 size-14"
                  asChild
                >
                  <Link href="/">
                    <HomeIcon size={24} />
                    Início
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex flex-col items-center space-x-2 size-14"
                  asChild
                >
                  <Link href="/vagas">
                    <BriefcaseIcon size={24} />
                    Vagas
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex flex-col items-center space-x-2 size-14"
                  asChild
                >
                  <Link href="/perfil">
                    <UserIcon size={24} />
                    Perfil
                  </Link>
                </Button>
                <ModeToggle />
              </div>
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
