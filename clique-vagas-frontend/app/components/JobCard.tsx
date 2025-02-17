"use client";

import React, { useState, useEffect } from 'react';
import styles from './JobCard.module.css';
import SubscriptionsModal from './SubscriptionsModal';
import { SkillPosting, SkillType, ProficiencyLevel } from '../interfaces/Skill';

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
    onViewSubscriptions?: () => void;
    companyEmail: string;
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
    children,
    onViewSubscriptions,
    companyEmail,
}) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showSubscriptions, setShowSubscriptions] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscriptionLoading, setSubscriptionLoading] = useState(false);
    const [skills, setSkills] = useState<SkillPosting[]>([]);

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

    // Efeito para verificar inscrição
    useEffect(() => {
        const checkSubscription = async () => {
            if (userRole === 'INTERN' && isAuthenticated) {
                try {
                    const response = await fetch(`http://localhost:8080/inscriptionJobPosting/intern/check/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    
                    if (response.ok) {
                        const isSubscribed = await response.json();
                        setIsSubscribed(isSubscribed);
                    }
                } catch (error) {
                    console.error('Erro ao verificar inscrição:', error);
                }
            }
        };

        checkSubscription();
    }, [id, userRole, isAuthenticated]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch(`http://localhost:8080/skill_posting/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    // Formata os dados para seguir o formato de SkillPosting
                    const formattedSkills: SkillPosting[] = data.map((item: any) => ({
                        id: item.id,
                        idSkill: item.idSkill.skillId,
                        proficiencyLevel: item.proficiencyLevel as ProficiencyLevel,
                        name: item.idSkill.name,
                        type: item.idSkill.type as SkillType,
                    }));
                    setSkills(formattedSkills);
                }
            } catch (error) {
                console.error('Error fetching skills:', error);
            }
        };

        if (isExpanded) {
            fetchSkills();
        }
    }, [id, isExpanded]);

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

    const handleSubscribe = async () => {
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }

        setSubscriptionLoading(true);
        try {
            const url = `http://localhost:8080/inscriptionJobPosting/${id}`;
            const method = isSubscribed ? 'DELETE' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                setIsSubscribed(!isSubscribed);
                if (isSubscribed) {
                    setLikeCount(prev => prev - 1);
                } else {
                    setLikeCount(prev => prev + 1);
                }
            }
        } catch (error) {
            console.error('Erro na inscrição:', error);
        } finally {
            setSubscriptionLoading(false);
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
                <div className={styles.skillsSection}>
                    <h4>Habilidades Requeridas:</h4>
                    <div className={styles.skillsList}>
                        {skills.map((skill, index) => (
                            <div key={index} className={styles.skillTag}>
                                {skill.name} ({skill.type === 'HARD_SKILL' ? 'Hard Skill' : 'Soft Skill'}) ({skill.proficiencyLevel.toLowerCase()})
                            </div>
                        ))}
                    </div>
                </div>
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
                            <button 
                                className={styles.subscriptionsButton} 
                                onClick={() => setShowSubscriptions(true)}
                            >
                                Ver Inscrições
                            </button>
                        </>
                    )}
                    {isAuthenticated && userRole === 'INTERN' && (
                        <button 
                            className={styles.inscreverButton} 
                            onClick={handleSubscribe}
                            disabled={subscriptionLoading}
                        >
                            {isSubscribed ? 'Remover Inscrição' : 'Inscrever-se'}
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

            {showSubscriptions && (
                <SubscriptionsModal 
                    jobPostingId={id}
                    onClose={() => setShowSubscriptions(false)}
                />
            )}
        </div>
    );
};

export default JobCard;
