'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';

interface Subscription {
  id: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    fileProfile: string;
  };
  pontuation: number;
  inscriptionDate: string;
}

interface SubscriptionsModalProps {
  jobPostingId: number;
  onClose: () => void;
}

const SubscriptionsModal: React.FC<SubscriptionsModalProps> = ({
  jobPostingId,
  onClose,
}) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/inscriptionJobPosting/company/${jobPostingId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) throw new Error('Erro ao buscar inscrições');
        const data = await response.json();
        setSubscriptions(data);
      } catch (error) {
        console.error('Erro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [jobPostingId]);

  const handleProfileClick = (email: string) => {
    router.push(`/perfil/${email}`);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Inscrições nesta Vaga</DialogTitle>
          <DialogDescription>
            Veja abaixo as inscrições para esta vaga.
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <p className="text-center">Carregando...</p>
        ) : subscriptions.length === 0 ? (
          <p className="text-center">Nenhuma inscrição encontrada</p>
        ) : (
          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${sub.pontuation === 100 ? 'bg-yellow-100 dark:bg-yellow-900' : 'bg-white dark:bg-gray-800'}`}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      sub.user.fileProfile
                        ? `data:image/png;base64,${sub.user.fileProfile}`
                        : '/img/default-profile.png'
                    }
                    alt="Profile"
                    className="w-16 h-16 rounded-full cursor-pointer"
                    onClick={() => handleProfileClick(sub.user.email)}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {sub.user.firstName} {sub.user.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {sub.user.email}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Inscrito em:{' '}
                      {new Date(sub.inscriptionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Pontuação: {sub.pontuation.toFixed(1)}
                  </p>
                  {sub.pontuation === 100 && (
                    <span className="text-yellow-500 dark:text-yellow-300">
                      ⭐
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SubscriptionsModal;
