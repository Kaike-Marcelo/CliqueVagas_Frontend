"use client";

import React, { useState } from 'react';
import styles from './JobCard.module.css';

interface JobCardProps {
    id: string;
    company: string;
    status: string;
    title: string;
    responsibilities: string[];
    location: string;
}

const JobCard: React.FC<JobCardProps> = ({ id, company, status, title, responsibilities, location }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleCard = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`${styles.card} ${isExpanded ? styles.expanded : styles.minimized}`} id={id}>
            <div className={styles['card-header']} onClick={toggleCard}>
                <div className={styles['card-header-top']}>
                    <div className={styles['company-info']}>
                        <img src="/img/profile-bl.png" alt="Company Icon" />
                        <span>{company}</span>
                    </div>
                    <span className={`${styles.status} ${status === 'Inativo' ? styles.inactive : ''}`}>{status}</span>
                </div>
                <h3>{title}</h3>
            </div>
            <div className={styles['card-body']}>
                <p>Responsabilidades:</p>
                <ul>
                    {responsibilities.map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                    ))}
                </ul>
                <p>Local: {location}</p>
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
            id: 'card1',
            company: 'Nome da Empresa',
            status: 'Ativo',
            title: 'Título da Vaga',
            responsibilities: [
                'Auxiliar na criação de conteúdo para redes sociais e blog.',
                'Monitorar e analisar métricas de desempenho das campanhas.',
                'Apoiar na gestão de campanhas de e-mail marketing.',
                'Colaborar com a equipe na elaboração de estratégias de SEO.'
            ],
            location: 'Eunápolis-BA'
        },
        {
            id: 'card2',
            company: 'Nome da Empresa',
            status: 'Inativo',
            title: 'Título da Vaga',
            responsibilities: [
                'Auxiliar na criação de conteúdo para redes sociais e blog.',
                'Monitorar e analisar métricas de desempenho das campanhas.',
                'Apoiar na gestão de campanhas de e-mail marketing.',
                'Colaborar com a equipe na elaboração de estratégias de SEO.'
            ],
            location: 'Eunápolis-BA'
        },
        {
        id: 'card3',
        company: 'Outra Empresa',
        status: 'Ativo',
        title: 'Desenvolvedor Frontend',
        responsibilities: [
        'Desenvolver interfaces de usuário eficientes e reutilizáveis.',
        'Colaborar com designers para transformar protótipos em código.',
        'Garantir a compatibilidade entre navegadores e dispositivos.',
        'Otimizar aplicações para máxima velocidade e escalabilidade.'
        ],
        location: 'São Paulo-SP'
    },
    {
        id: 'card4',
        company: 'Outra Empresa',
        status: 'Inativo',
        title: 'Analista de Dados',
        responsibilities: [
        'Coletar e analisar dados de diversas fontes.',
        'Desenvolver relatórios e dashboards para a equipe.',
        'Identificar tendências e padrões nos dados.',
        'Apoiar a tomada de decisões com base em dados.'
        ],
        location: 'Rio de Janeiro-RJ'
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