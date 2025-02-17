'use client';

import Link from 'next/link';
import { Button } from '@/app/_components/ui/button';
import { Card, CardContent } from '@/app/_components/ui/card';
import { HomeIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface RegisterPageLayoutProps {
  title: string;
  imageSrc: string;
  children: ReactNode;
}

export default function RegisterPageLayout({
  title,
  imageSrc,
  children,
}: RegisterPageLayoutProps) {
  return (
    <main className="min-h-screen bg-[#0B1B2B] flex items-center justify-center p-4">
      <Card className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-auto lg:h-[80vh] max-w-full lg:max-w-[80vw]">
        <div className="relative hidden lg:flex items-center justify-center bg-muted bg-gradient-to-r from-orange-400 to-orange-500 w-full lg:w-1/2 h-64 lg:h-full">
          <img
            src={imageSrc}
            alt="Register Illustration"
            className="max-h-full max-w-full object-contain"
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
        <CardContent className="flex flex-col py-8 px-4 lg:px-8 max-h-full lg:max-h-[80vh] overflow-y-auto w-full lg:w-1/2">
          <div className="flex justify-stretch mb-6 space-x-7">
            <Link href="/auth/register">
              <Button className="">←</Button>
            </Link>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {title}
            </h2>
          </div>

          {children}
        </CardContent>
      </Card>
    </main>
  );
}
