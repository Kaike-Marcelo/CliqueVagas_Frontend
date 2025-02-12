"use client";

import JobForm from './JobForm';
import React, { useState, useEffect } from 'react';
import styles from './JobCard.module.css';
import { getUserRole } from '../utils/UserRole';

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
    userRole: string | null;
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
    userRole
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [showEditForm, setShowEditForm] = useState(false);

    const toggleCard = () => {
        setIsExpanded(!isExpanded);
    };

    const handleLike = () => {
        setLiked(!liked);
        setLikeCount(prev => (liked ? prev - 1 : prev + 1));
    };

    return (
        <div className={`${styles.card} ${isExpanded ? styles.expanded : styles.minimized}`} id={id.toString()}>
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
                <p>Final do prazo de inscrição: {new Date(applicationDeadline).toLocaleDateString()}</p>
                <p>Data de publicação: {new Date(publicationDate).toLocaleDateString()}</p>
                <p>Atualizado pela última vez: {new Date(updateAt).toLocaleDateString()}</p>
            </div>

            {/* Adiciona o formulário de edição se showEditForm for true */}
            {showEditForm && (
                <JobForm
                    initialData={{
                        title,
                        description,
                        jobPostingStatus,
                        address,
                        applicationDeadline
                    }}
                    onSubmit={(data) => {
                        // Lógica para enviar para API (implementar posteriormente)
                        setShowEditForm(false);
                    }}
                    onCancel={() => setShowEditForm(false)}
                />
            )}

            <div className={styles['button-container']}>
                {userRole === 'COMPANY' ? (
                    <div className={styles.creatorButtons}>
                        <button className={styles.editButton} onClick={() => setShowEditForm(true)}>
                            Alterar
                        </button>
                        <button className={styles.deleteButton}>
                            Excluir
                        </button>
                    </div>
                ) : userRole === 'INTERN' ? (
                    <button className={styles.inscreverButton}>
                        Inscrever-se na vaga
                    </button>
                ) : null}

                <div className={styles.userButtons}>
                    <button onClick={handleLike} className={`${styles.likeButton} ${liked ? styles.liked : ''}`}>
                        ♥ {likeCount}
                    </button>
                    <button className={styles.button} onClick={toggleCard}>
                        {isExpanded ? 'Ver Menos' : 'Ver Mais'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const JobCardContainer: React.FC = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        setUserRole(getUserRole());
    }, []);

    const cards = [
        {
            id: 1,
            company: 'Nome da Empresa',
            title: 'Título do Trabalho',
            description: 'Descrição do trabalho vai aqui.',
            jobPostingStatus: 'Inativo',
            address: 'Rua Principal, 123, Cidade, Estado',
            applicationDeadline: '2023-12-31T23:59:59Z',
            publicationDate: '2023-01-01T00:00:00Z',
            updateAt: '2023-01-02T00:00:00Z'
        },
        {
            id: 2,
            company: 'Nome da Empresa',
            title: 'Título do Trabalho',
            description: 'Descrição do trabalho vai aqui.',
            jobPostingStatus: 'Ativo',
            address: 'Rua Principal, 123, Cidade, Estado',
            applicationDeadline: '2023-12-31T23:59:59Z',
            publicationDate: '2023-01-01T00:00:00Z',
            updateAt: '2023-01-02T00:00:00Z'
        },
        {
            id: 3,
            company: 'Nome da Empresa',
            title: 'Título do Trabalho',
            description: 'Descrição do trabalho vai aqui.',
            jobPostingStatus: 'Inativo',
            address: 'Rua Principal, 123, Cidade, Estado',
            applicationDeadline: '2023-12-31T23:59:59Z',
            publicationDate: '2023-01-01T00:00:00Z',
            updateAt: '2023-01-02T00:00:00Z'
        },
        {
            id: 4,
            company: 'Nome da Empresa',
            title: 'Título do Trabalho',
            description: 'Descrição do trabalho vai aqui.',
            jobPostingStatus: 'Ativo',
            address: 'Rua Principal, 123, Cidade, Estado',
            applicationDeadline: '2023-12-31T23:59:59Z',
            publicationDate: '2023-01-01T00:00:00Z',
            updateAt: '2023-01-02T00:00:00Z'
        }
    ];

    return (
        <div className={styles['card-container']}>
            {userRole === 'COMPANY' && (
                <button onClick={() => setShowAddForm(true)} className={styles.addButton}>
                    Adicionar Vaga
                </button>
            )}

            {cards.map(card => (
                <JobCard key={card.id} {...card} userRole={userRole} />
            ))}

            {showAddForm && (
                <JobForm
                    onSubmit={() => setShowAddForm(false)}
                    onCancel={() => setShowAddForm(false)}
                />
            )}
        </div>
    );
};

export default JobCardContainer;
