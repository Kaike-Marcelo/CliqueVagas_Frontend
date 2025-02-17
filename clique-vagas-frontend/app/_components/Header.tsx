'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BriefcaseIcon, HomeIcon } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { ModeToggle } from '@/app/_components/ModeToggle';
import { getUserRole, logoutUser } from '../_services/userService';
import { NavButton } from './NavButton';
import { UserMenu } from './UserMenu';
import { SearchBar } from './SearchBar';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserRole = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token não encontrado');
      }

      const userRole = token ? await getUserRole(token) : null;
      if (!userRole) console.log('Papel do usuário inválido');

      setRole(userRole);
    } catch (error) {
      console.error('Erro ao obter papel do usuário:', error);
      setRole(null);
      router.push('/auth/login');
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  }, [router]);

  useEffect(() => {
    fetchUserRole();
  }, [fetchUserRole]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        await logoutUser(token);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      fetchUserRole();
      router.push('/auth/login');
      router.refresh();
    }
  };

  if (
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register') ||
    isLoading
  ) {
    return null;
  }

  return (
    <header className="flex justify-between items-center p-1 px-6 bg-sky-950 text-white">
      <div className="max-w-6xl mx-auto flex justify-between w-full">
        <div className="flex items-center space-x-4">
          <Image
            src="/img/logo.png"
            alt="Logo"
            width={40}
            height={40}
            priority
          />
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4">
          {role ? (
            <>
              <NavButton
                href="/"
                icon={<HomeIcon size={24} />}
                label="Início"
              />
              <NavButton
                href="/"
                icon={<BriefcaseIcon size={24} />}
                label="Vagas"
              />
              <UserMenu
                handleLogout={handleLogout}
                fetchUserRole={fetchUserRole}
              />
            </>
          ) : (
            <Button
              variant="default"
              className="dark:bg-white dark:text-black"
              asChild
            >
              <Link href="/auth/login">Fazer Login</Link>
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
