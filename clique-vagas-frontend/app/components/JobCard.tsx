"use client";

import React, { useState, useEffect } from 'react';
import styles from './JobCard.module.css';

interface JobCardProps {
    id: number;
    company: string;
    title: string;
    description: string;
    jobPostingStatus: string;
    address: string;
    applicationDeadline: string;
    publicationDate: string;
    updateAt: string;
    isExpanded: boolean;
    isAuthenticated: boolean;
    userRole?: string | null;
    onToggle: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onSubscribe: () => void;
    children?: React.ReactNode;
}

const JobCard: React.FC<JobCardProps> = ({
    id,
    company,
    title,
    description,
    jobPostingStatus,
    address,
    applicationDeadline,
    publicationDate,
    updateAt,
    isExpanded,
    isAuthenticated,
    userRole,
    onToggle,
    onEdit,
    onDelete,
    onSubscribe,
    children
}) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLikeData = async () => {
            try {
                // Buscar contagem de likes
                const countResponse = await fetch(`http://localhost:8080/api/likes/${id}/count`);
                if (countResponse.ok) {
                    const count = await countResponse.json();
                    setLikeCount(count);
                }

                // Verificar se usuário deu like
                if (isAuthenticated) {
                    const checkResponse = await fetch(`http://localhost:8080/api/likes/${id}/check`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    if (checkResponse.ok) {
                        const hasLiked = await checkResponse.json();
                        setLiked(hasLiked);
                    }
                }
            } catch (error) {
                console.error('Error fetching like data:', error);
            }
        };

        fetchLikeData();
    }, [id, isAuthenticated]);

    const handleLike = async () => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }

        setIsLoading(true);
        try {
            if (liked) {
                // Remover like
                const response = await fetch(`http://localhost:8080/api/likes/${id}/unlike`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    setLiked(false);
                    setLikeCount(prev => prev - 1);
                }
            } else {
                // Adicionar like
                const response = await fetch(`http://localhost:8080/api/likes/${id}/like`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.ok) {
                    setLiked(true);
                    setLikeCount(prev => prev + 1);
                }
            }
        } catch (error) {
            console.error('Error toggling like:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`${styles.card} ${isExpanded ? styles.expanded : styles.minimized}`}>
            <div className={styles['card-header']}>
                <div className={styles['card-header-top']}>
                    <div className={styles['company-info']}>
                        <img src="/img/profile-bl.png" alt="Company Icon" />
                        <span>{company}</span>
                    </div>
                    <span className={`${styles.status} ${jobPostingStatus === 'Inativo' ? styles.inactive : ''}`}>
                        {jobPostingStatus}
                    </span>
                </div>
                <h3>{title}</h3>
            </div>
            
            <div className={styles['card-body']}>
                <p>{description}</p>
                <p>Endereço: {address}</p>
                <p>Final do prazo: {new Date(applicationDeadline).toLocaleDateString()}</p>
                <p>Publicação: {new Date(publicationDate).toLocaleDateString()}</p>
                <p>Última atualização: {new Date(updateAt).toLocaleDateString()}</p>
            </div>

            {children}

            <div className={styles['button-container']}>
                <div className={styles.creatorButtons}>
                    {isAuthenticated && userRole === 'COMPANY' && onEdit && onDelete && (
                        <>
                            <button className={styles.editButton} onClick={onEdit}>
                                Alterar
                            </button>
                            <button className={styles.deleteButton} onClick={onDelete}>
                                Excluir
                            </button>
                        </>
                    )}
                    {isAuthenticated && userRole === 'INTERN' && (
                        <button className={styles.inscreverButton} onClick={onSubscribe}>
                            Inscrever-se
                        </button>
                    )}
                </div>

                <div className={styles.userButtons}>
                    <button
                        onClick={handleLike}
                        disabled={!isAuthenticated || isLoading}
                        className={`${styles.likeButton} ${liked ? styles.liked : ''}`}
                    >
                        ♥ {likeCount}
                    </button>
                    <button className={styles.button} onClick={onToggle}>
                        {isExpanded ? 'Ver Menos' : 'Ver Mais'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
