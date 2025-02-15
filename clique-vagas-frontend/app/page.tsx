'use client';

import { useEffect, useState } from 'react';
import { getUsers } from '@/app/_services/userService';
import { User } from './_services/types/User';
import { Intern } from './_services/types/Intern';
import { getInterns } from './_services/internService';

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [interns, setInterns] = useState<Intern[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUsers()
        .then(setUsers)
        .catch((err) => setError(err.message));
    } else {
      setError('Token not found');
    }
  }, []);

  useEffect(() => {
    getInterns()
      .then(setInterns)
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
            <p>Telefone: {user.phone}</p>
            <p>
              Role: {user.role} | Status: {user.enabled ? 'Ativo' : 'Inativo'}
            </p>
          </li>
        ))}
      </ul>
      <h1 className="text-2xl font-bold">Lista de Estagiarios</h1>
      <ul>
        {interns.map((intern) => (
          <li key={intern.id} className="border-b py-2">
            <p>
              <strong>
                {intern.user.firstName} {intern.user.lastName}
              </strong>{' '}
              ({intern.user.email})
            </p>
            <p>Telefone: {intern.user.phone}</p>
            <p>
              Role: {intern.user.role} | Status:{' '}
              {intern.user.enabled ? 'Ativo' : 'Inativo'}
            </p>
            <p>Data de Nascimento: {intern.dateOfBirth}</p>
            <p>Sexo: {intern.sex}</p>
            <p>Instituição de Ensino: {intern.educationalInstitution}</p>
            <p>Área de Interesse: {intern.areaOfInterest}</p>
            <p>Ano de Entrada: {intern.yearOfEntry}</p>
            <p>Data de Formatura Esperada: {intern.expectedGraduationDate}</p>
            <p>CPF: {intern.cpf}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
