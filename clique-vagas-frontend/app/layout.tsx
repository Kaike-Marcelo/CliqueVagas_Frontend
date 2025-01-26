import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BriefcaseIcon, HomeIcon, SearchIcon, UserIcon } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import Link from 'next/link';

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
        <header className="flex justify-between items-center p-3 px-6 bg-gray-800 text-white">
          <div className="flex items-center space-x-4">
            <img src="img/logo.png" width={50} height={50} />
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
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
