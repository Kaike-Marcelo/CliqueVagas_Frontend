"use client";

import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
import JobForm from '../components/JobForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './vagas.module.css';
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
}

const VagasPage: React.FC = () => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [expandedCards, setExpandedCards] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const role = getUserRole();
        const isAuthenticated = role !== null;
        
        if (!isAuthenticated) {
            window.location.href = '/login';
            return;
        }
        
        setUserRole(role);
        fetchJobs(role);
    }, []);

    const fetchJobs = async (role: string) => {
        try {
            if (role === 'COMPANY') {
                const email = getUserEmail();
                if (!email) {
                    console.error('E-mail não encontrado');
                    return;
                }

                const response = await fetch(`http://localhost:8080/job_posting/company/${email}`);
                if (!response.ok) throw new Error('Erro na API');
                
                const data = await response.json();
                
                const formattedJobs = data.map((item: any) => ({
                    id: item.jobPost.id,
                    company: "Sua Empresa",
                    title: item.jobPost.title,
                    description: item.jobPost.description,
                    jobPostingStatus: item.jobPost.jobPostingStatus === 'ACTIVE' ? 'Ativo' : 'Inativo',
                    address: item.jobPost.address,
                    applicationDeadline: item.jobPost.applicationDeadline,
                    publicationDate: new Date().toISOString(),
                    updateAt: new Date().toISOString()
                }));

                setJobs(formattedJobs);
            } else {
                const mockData = [
                    {
                        id: 2,
                        company: "Empresa Contratante",
                        title: "Designer UI/UX",
                        description: "Vaga para designer de interfaces...",
                        jobPostingStatus: "Ativo",
                        address: "Avenida Central, 456",
                        applicationDeadline: "2023-11-30T23:59:59Z",
                        publicationDate: "2023-02-01T00:00:00Z",
                        updateAt: "2023-02-05T00:00:00Z"
                    }
                ];
                setJobs(mockData);
            }
        } catch (error) {
            console.error('Erro ao buscar vagas:', error);
            setJobs([{
                id: 1,
                company: "Sua Empresa",
                title: "Backup Data",
                description: "Dados mockados de fallback",
                jobPostingStatus: "Ativo",
                address: "Rua Principal, 123",
                applicationDeadline: "2023-12-31T23:59:59Z",
                publicationDate: "2023-01-01T00:00:00Z",
                updateAt: "2023-01-02T00:00:00Z"
            }]);
        }
    };

    const handleToggleCard = (jobId: number) => {
        setExpandedCards(prev => ({
            ...prev,
            [jobId]: !prev[jobId]
        }));
    };

    const handleAddJob = async (newJob: Omit<Job, 'id' | 'publicationDate' | 'updateAt'>) => {
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
            fetchJobs('COMPANY');
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
            fetchJobs('COMPANY');
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
            fetchJobs('COMPANY');
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

                    {jobs.map(job => (
                        <JobCard
                            key={job.id}
                            {...job}
                            isAuthenticated={true}
                            userRole={userRole}
                            isExpanded={expandedCards[job.id] || false}
                            liked={false}
                            likeCount={0}
                            showEditForm={false}
                            onToggle={() => handleToggleCard(job.id)}
                            onLike={() => {}}
                            onEdit={() => setSelectedJob(job)}
                            onDelete={() => handleDeleteJob(job.id)}
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
                    ))}

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

export default VagasPage;
