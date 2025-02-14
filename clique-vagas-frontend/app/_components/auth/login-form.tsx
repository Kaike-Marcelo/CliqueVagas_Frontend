'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/app/_lib/utils';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import Link from 'next/link';
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from '@/app/_components/ui/alert';
import { loginUser } from '@/app/_services/userService';
import { AuthenticationDto } from '@/app/_services/types/User';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'form'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const credentials: AuthenticationDto = { email, password };
      const data = await loginUser(credentials);

      console.log('Login bem-sucedido:', data);

      // Armazena o token no localStorage
      localStorage.setItem('token', data.token);

      // Redireciona para a página inicial ou outra página após o login bem-sucedido
      router.push('/');
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError(
        'Falha ao fazer login. Verifique suas credenciais e tente novamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Entrar na sua conta</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Insira seu email abaixo para entrar na sua conta
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Senha</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Entrar'}
        </Button>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="text-center text-sm">
        Não tem uma conta?{' '}
        <Link href="/auth/register" className="underline underline-offset-4">
          Cadastre-se
        </Link>
      </div>
    </form>
  );
}
