'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { z } from 'zod';
import { useToast } from '@/app/_hooks/use-toast';
import { resetPassword } from '../_services/userService';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
    confirmPassword: z.string().min(6, {
      message: 'A confirmação de senha deve ter pelo menos 6 caracteres',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  console.log('Token de redefinir:', token);

  useEffect(() => {
    if (!token) {
      setError('Token inválido ou ausente.');
    }
  }, [token]);

  const handleResetPassword = async () => {
    try {
      resetPasswordSchema.parse({ password, confirmPassword });
      if (token) {
        setIsLoading(true);
        await resetPassword(token, password);
        toast({
          title: 'Senha redefinida',
          description:
            'Sua senha foi redefinida com sucesso. Estamos te redirecionando para a página de login.',
          style: {
            backgroundColor: 'green',
            color: 'white',
          },
        });
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        setError('Token inválido ou ausente.');
      }
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      } else {
        setError('Ocorreu um erro ao redefinir a senha.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Redefinir Senha</h1>
        <p className="mb-4">Insira sua nova senha abaixo.</p>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Nova Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Nova Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirmar Nova Senha"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
        <Button
          disabled={isLoading}
          type="button"
          onClick={handleResetPassword}
          className="mt-4 w-full"
        >
          {isLoading ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Carregando...
            </>
          ) : (
            'Redefinir Senha'
          )}
        </Button>
      </div>
    </div>
  );
}
