'use client';

import { BriefcaseIcon, HomeIcon, SearchIcon, UserIcon } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import Link from 'next/link';
import { ModeToggle } from '@/app/_components/ModeToggle';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const showHeader =
    !pathname.startsWith('/auth/login') &&
    !pathname.startsWith('/auth/register');

  if (!showHeader) {
    return null;
  }

  return (
    <header className="flex justify-between items-center p-1 px-6 bg-sky-950 text-white">
      <div className="max-w-6xl mx-auto flex justify-between w-full">
        <div className="flex items-center space-x-4">
          <Image src="/img/logo.png" alt="Logo" width={40} height={40} />
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
  );
}
