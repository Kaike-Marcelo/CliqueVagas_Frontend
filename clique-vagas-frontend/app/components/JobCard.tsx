"use client";

import React from 'react';
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
    liked: boolean;
    likeCount: number;
    showEditForm: boolean;
    isAuthenticated: boolean;
    userRole?: string | null;
    onToggle: () => void;
    onLike: () => void;
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
    liked,
    likeCount,
    showEditForm,
    isAuthenticated,
    userRole,
    onToggle,
    onLike,
    onEdit,
    onDelete,
    onSubscribe,
    children
}) => {
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
                        onClick={onLike}
                        disabled={!isAuthenticated}
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
