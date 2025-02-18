'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BriefcaseIcon, HomeIcon } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import { ModeToggle } from '@/app/_components/ModeToggle';
import { getUserRole, logoutUser } from '../_services/userService';
import { NavButton } from './NavButton';
import { UserMenu } from './UserMenu';
import { Input } from './ui/input';

const Header: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [role, setRole] = useState<string | null>(null);

  const fetchUserRole = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('Token não encontrado');
        return;
      }

      const userRole = await getUserRole(token);
      if (!userRole) {
        console.log('Papel do usuário inválido');
        return;
      }

      setRole(userRole);
    } catch (error) {
      console.error('Erro ao obter papel do usuário:', error);
      setRole(null);
      router.push('/auth/login');
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchUserRole();
    }
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

  useEffect(() => {
    if (pathname !== '/home') return;

    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        router.push(`/home?q=${encodeURIComponent(searchQuery)}`);
      } else {
        router.push('/home');
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [searchQuery, router, pathname]);

  const isActive = (path: string) => pathname === path;

  if (
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register') ||
    pathname.startsWith('/reset-password')
  ) {
    return null;
  }

  return (
    <header className="flex justify-between items-center p-1 px-6 bg-sky-950 text-white">
      <div className="max-w-6xl mx-auto flex justify-between w-full">
        <div className="flex items-center space-x-4">
          <Image
            src="/img/cliquevagas.png"
            alt="Clique Vagas"
            width={40}
            height={40}
            priority
          />
          <Input
            type="text"
            className="dark:bg-gray-800 text-white"
            placeholder="Pesquisar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-4">
          {role ? (
            <>
              <NavButton
                href="/home"
                icon={<HomeIcon size={24} />}
                label="Início"
                isActive={isActive('/home')}
              />
              <NavButton
                href="/vagas"
                icon={<BriefcaseIcon size={24} />}
                label="Vagas"
                isActive={isActive('/vagas')}
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
};

export default Header;
