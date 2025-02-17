import { LoginForm } from '@/app/_components/auth/login-form';
import { Label } from '@/app/_components/ui/label';
import { GalleryVerticalEnd, HomeIcon } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0B1B2B] flex items-center justify-center">
      <div className="grid lg:grid-cols-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden h-[60vh]">
        <div className="relative hidden lg:flex items-center justify-center bg-muted bg-gradient-to-r from-orange-400 to-orange-500">
          <img
            src="/img/login-illustration.png"
            alt="Login Illustration"
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
        <div className="flex flex-col gap-4 p-6 md:p-10">
          <div className="flex justify-center gap-2 md:justify-center">
            <div className="flex items-center gap-2">
              <img
                src="/img/logo.png"
                alt="Clique Vagas Logo"
                className="h-10 w-10 object-contain bg-primary rounded-sm"
              />
              <Label className="text-2xl font-bold">CLIQUE VAGAS</Label>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-xs">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
