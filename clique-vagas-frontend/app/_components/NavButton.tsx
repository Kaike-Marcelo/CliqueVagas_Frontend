import { Button } from '@/app/_components/ui/button';
import Link from 'next/link';
import { JSX } from 'react';

interface NavButtonProps {
  href: string;
  icon: JSX.Element;
  label: string;
}

export function NavButton({ href, icon, label }: NavButtonProps) {
  return (
    <Button
      variant="ghost"
      className="flex flex-col items-center size-14"
      asChild
    >
      <Link href={href}>
        {icon}
        {label}
      </Link>
    </Button>
  );
}
