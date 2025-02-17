'use client';

import React, { useEffect, useState } from 'react';
import styles from './SubscriptionsModal.module.css';

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

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Inscrições nesta Vaga</h2>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {loading ? (
          <p>Carregando...</p>
        ) : subscriptions.length === 0 ? (
          <p>Nenhuma inscrição encontrada</p>
        ) : (
          <div className={styles.subscriptionsList}>
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className={`${styles.subscriptionItem} ${sub.pontuation === 100 ? styles.highScore : ''}`}
              >
                <div className={styles.userInfo}>
                  <img
                    src={sub.user.fileProfile || '/img/default-profile.png'}
                    alt="Profile"
                    className={styles.profileImage}
                  />
                  <div>
                    <h3>
                      {sub.user.firstName} {sub.user.lastName}
                    </h3>
                    <p>{sub.user.email}</p>
                    <p>
                      Inscrito em:{' '}
                      {new Date(sub.inscriptionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className={styles.pontuation}>
                  Pontuação: {sub.pontuation.toFixed(1)}
                  {sub.pontuation === 100 && (
                    <span className={styles.goldStar}>⭐</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionsModal;
