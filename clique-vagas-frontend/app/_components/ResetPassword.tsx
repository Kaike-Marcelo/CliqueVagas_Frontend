import { useState } from 'react';
import { API_URL } from '../_services/api';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { z } from 'zod';

const resetPasswordSchema = z.object({
  newPassword: z.string().min(4, 'A senha deve ter pelo menos 4 caracteres'),
});

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    try {
      resetPasswordSchema.parse({ newPassword });
      const token = localStorage.getItem('token');
      console.log('Resetando senha...');
      const response = await fetch(
        `${API_URL}/auth/reset-password?token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword }),
        }
      );
      if (response.ok) {
        console.log('Senha resetada com sucesso!');
        setError(null);
      } else {
        console.error('Erro ao resetar senha:', response.statusText);
        setError('Erro ao resetar senha');
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError(err.errors[0].message);
      } else {
        console.error('Erro ao resetar senha:', err);
        setError('Erro ao resetar senha');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button onClick={handleResetPassword}>Reset Password</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResetPassword;
