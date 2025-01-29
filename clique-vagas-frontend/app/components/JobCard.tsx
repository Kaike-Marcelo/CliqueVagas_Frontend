"use client";

import React, { useState } from 'react';
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
}

const JobCard: React.FC<JobCardProps> = ({ id, company, title, description, jobPostingStatus, address, applicationDeadline, publicationDate, updateAt }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleCard = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`${styles.card} ${isExpanded ? styles.expanded : styles.minimized}`} id={id.toString()}>
            <div className={styles['card-header']}>
                <div className={styles['card-header-top']}>
                    <div className={styles['company-info']}>
                        <img src="/img/profile-bl.png" alt="Company Icon" />
                        <span>{company}</span>
                    </div>
                    <span className={`${styles.status} ${jobPostingStatus === 'Inativo' ? styles.inactive : ''}`}>{jobPostingStatus}</span>
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
            <div className={styles['button-container']}>
                <button className={styles.button} onClick={toggleCard}>Ver Mais</button>
            </div>
        </div>
    );
};

const JobCardContainer: React.FC = () => {
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
            {cards.map(card => (
                <JobCard key={card.id} {...card} />
            ))}
        </div>
    );
};

export default JobCardContainer;
