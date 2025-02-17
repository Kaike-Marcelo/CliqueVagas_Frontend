import { useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import { Input } from '@/app/_components/ui/input';
import { Label } from '@/app/_components/ui/label';
import { z } from 'zod';
import { useToast } from '@/app/_hooks/use-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
});

export function ForgotPasswordDialog() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleForgotPassword = async () => {
    try {
      forgotPasswordSchema.parse({ email });
      console.log('Email de recuperação enviado para:', email);
      setError(null);
      setIsOpen(false);
      toast({
        title: 'Email enviado',
        description:
          'Um email de recuperação de senha foi enviado para o seu endereço.',
      });
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0].message);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <a
          href="#"
          className="ml-auto text-sm underline-offset-4 hover:underline"
          onClick={() => setIsOpen(true)}
        >
          Esqueceu sua senha?
        </a>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Recuperar Senha</DialogTitle>
        <DialogDescription>
          Insira seu email abaixo para receber um link de recuperação de senha.
        </DialogDescription>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="forgot-password-email">Email</Label>
            <Input
              id="forgot-password-email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleForgotPassword}>Enviar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
