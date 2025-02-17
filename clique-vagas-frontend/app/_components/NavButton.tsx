import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { JSX } from 'react';

interface NavButtonProps {
  href: string;
  icon: JSX.Element;
  label: string;
  isActive: boolean;
}

export function NavButton({ href, icon, label, isActive }: NavButtonProps) {
  return (
    <Button
      variant="ghost"
      className={`flex flex-col items-center size-14 ${isActive ? 'bg-gray-500' : ''}`}
      asChild
    >
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  );
}
