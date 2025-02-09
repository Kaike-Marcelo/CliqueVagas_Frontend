'use client';

import { useEffect, useState } from 'react';
import { getUsers } from '@/app/services/userService';
import { User } from './services/types/User';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p className="text-red-500">Erro: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Lista de Usuários</h1>
      <ul>
        {users.map((user) => (
          <li key={user.userId} className="border-b py-2">
            <p>
              <strong>
                {user.firstName} {user.lastName}
              </strong>{' '}
              ({user.email})
            </p>
            <p>
              CPF: {user.cpf} | Telefone: {user.phone}
            </p>
            <p>
              Role: {user.role} | Status: {user.enabled ? 'Ativo' : 'Inativo'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
