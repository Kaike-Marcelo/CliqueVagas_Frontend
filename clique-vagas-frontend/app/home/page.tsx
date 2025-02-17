"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './home.module.css';
import { getUserRole } from '../utils/UserRole';
import { getUserEmail } from '../utils/UserEmail';

interface Job {
    id: number;
    company: string;
    title: string;
    description: string;
    jobPostingStatus: string;
    address: string;
    applicationDeadline: string;
    publicationDate: string;
    updateAt: string;
    companyEmail: string;
}

const HomePage: React.FC = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});
    const [showAddForm, setShowAddForm] = useState(false);

    const searchParams = useSearchParams();
    const query = searchParams.get('q');

    const fetchJobs = async () => {
        try {
            let url = 'http://localhost:8080/job_posting/public';
            if (query) {
                url = `http://localhost:8080/job_posting/search?q=${encodeURIComponent(query)}`;
            }
            
            const response = await fetch(url);
            if (!response.ok) throw new Error('Erro ao buscar vagas');
            
            const data = await response.json();
            
            const formattedJobs = data.map((item: any) => ({
                id: item.jobPost.id,
                company: item.companyName,
                title: item.jobPost.title,
                description: item.jobPost.description,
                jobPostingStatus: item.jobPost.jobPostingStatus === 'ACTIVE' ? 'Ativo' : 'Inativo',
                address: item.jobPost.address,
                applicationDeadline: item.jobPost.applicationDeadline,
                publicationDate: new Date().toISOString(),
                updateAt: new Date().toISOString(),
                companyEmail: item.email
            }));

            setJobs(formattedJobs);
        } catch (error) {
            console.error('Erro:', error);
            setJobs([]);
        }
    };

    useEffect(() => {
        const role = getUserRole();
        setUserRole(role);
        if (role === 'COMPANY') {
            const email = getUserEmail();
            setUserEmail(email);
        }
        fetchJobs();
    }, [query]);

    const handleToggleCard = (jobId: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [jobId]: !prev[jobId]
        }));
    };

    const handleAddJob = async (newJob: Omit<Job, 'id' | 'publicationDate' | 'updateAt' | 'companyEmail'>) => {
        try {
            const response = await fetch('http://localhost:8080/job_posting', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    ...newJob,
                    jobPostingStatus: newJob.jobPostingStatus === 'Ativo' ? 'ACTIVE' : 'INACTIVE'
                })
            });

            if (!response.ok) throw new Error('Erro ao criar vaga');
            fetchJobs();
            setShowAddForm(false);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleEditJob = async (updatedJob: Job) => {
        try {
            const response = await fetch('http://localhost:8080/job_posting', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    id: updatedJob.id,
                    title: updatedJob.title,
                    description: updatedJob.description,
                    jobPostingStatus: updatedJob.jobPostingStatus === 'Ativo' ? 'ACTIVE' : 'INACTIVE',
                    address: updatedJob.address,
                    applicationDeadline: updatedJob.applicationDeadline
                })
            });

            if (!response.ok) throw new Error('Erro ao atualizar vaga');
            fetchJobs();
            setSelectedJob(null);
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    const handleDeleteJob = async (jobId: number) => {
        if (!window.confirm('Tem certeza que deseja excluir esta vaga?')) return;
        
        try {
            const response = await fetch(`http://localhost:8080/job_posting/${jobId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Erro ao excluir vaga');
            fetchJobs();
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <Header />
            
            <main className={styles.mainContent}>
                <div className={styles.cardWrapper}>
                    {userRole === 'COMPANY' && (
                        <button 
                            onClick={() => setShowAddForm(true)} 
                            className={styles.addButton}
                        >
                            Adicionar Vaga
                        </button>
                    )}

                    {jobs.length === 0 ? (
                        <div className={styles.noJobsMessage}>
                            {userRole === 'COMPANY' 
                                ? "Nenhuma postagem. Que tal criar uma?" 
                                : "Desculpe, não temos vagas disponíveis no momento."}
                        </div>
                    ) : (
                        jobs.map(job => {
                            const isOwner = userRole === 'COMPANY' && userEmail === job.companyEmail;
                            return (
                                <JobCard
                                    key={job.id}
                                    {...job}
                                    isAuthenticated={userRole !== null}
                                    userRole={userRole}
                                    isExpanded={expandedCards[job.id] || false}
                                    onToggle={() => handleToggleCard(job.id)}
                                    onEdit={isOwner ? () => setSelectedJob(job) : undefined}
                                    onDelete={isOwner ? () => handleDeleteJob(job.id) : undefined}
                                    onSubscribe={() => {}}
                                >
                                    {selectedJob?.id === job.id && (
                                        <JobForm
                                            initialData={selectedJob}
                                            onSubmit={handleEditJob}
                                            onCancel={() => setSelectedJob(null)}
                                        />
                                    )}
                                </JobCard>
                            );
                        })
                    )}

                    {showAddForm && (
                        <JobForm
                            onSubmit={handleAddJob}
                            onCancel={() => setShowAddForm(false)}
                        />
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default HomePage;
