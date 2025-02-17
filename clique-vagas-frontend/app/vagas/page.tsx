'use client';

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
  companyEmail: string;
}

const VagasPage: React.FC = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [expandedCards, setExpandedCards] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const role = getUserRole();
    const isAuthenticated = role !== null;

    if (!isAuthenticated) {
      window.location.href = '/auth/login';
      return;
    }

    setUserRole(role);
    if (role === 'COMPANY') {
      const email = getUserEmail();
      if (email) {
        setUserEmail(email);
      }
    }
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

        const response = await fetch(
          `http://localhost:8080/job_posting/company`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (!response.ok) throw new Error('Erro na API');

        const data = await response.json();

        const formattedJobs = data.map((item: any) => ({
          id: item.jobPost.id,
          company: 'Sua Empresa',
          title: item.jobPost.title,
          description: item.jobPost.description,
          jobPostingStatus:
            item.jobPost.jobPostingStatus === 'ACTIVE' ? 'Ativo' : 'Inativo',
          address: item.jobPost.address,
          applicationDeadline: item.jobPost.applicationDeadline,
          publicationDate: new Date().toISOString(),
          updateAt: new Date().toISOString(),
          companyEmail: email, // propriedade adicionada
        }));

        setJobs(formattedJobs);
      } else if (role === 'INTERN') {
        const response = await fetch(
          `http://localhost:8080/inscriptionJobPosting/intern`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) throw new Error('Erro na API');

        const data = await response.json();

        const formattedJobs = data.map((item: any) => ({
          id: item.id,
          company: 'Não disponível', // Ajuste conforme a necessidade
          title: item.title,
          description: item.description,
          jobPostingStatus:
            item.jobPostingStatus === 'ACTIVE' ? 'Ativo' : 'Inativo',
          address: item.address,
          applicationDeadline: item.applicationDeadline,
          publicationDate: new Date().toISOString(),
          updateAt: new Date().toISOString(),
          companyEmail: '', // Valor padrão, pois não é retornado pela API
        }));

        setJobs(formattedJobs);
      }
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
      setJobs([
        {
          id: 1,
          company: 'Sua Empresa',
          title: 'Backup Data',
          description: 'Dados mockados de fallback',
          jobPostingStatus: 'Ativo',
          address: 'Rua Principal, 123',
          applicationDeadline: '2023-12-31T23:59:59Z',
          publicationDate: '2023-01-01T00:00:00Z',
          updateAt: '2023-01-02T00:00:00Z',
          companyEmail: 'company@example.com', // propriedade adicionada
        },
      ]);
    }
  };

  const handleToggleCard = (jobId: number) => {
    setExpandedCards((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const handleAddJob = async (
    newJob: Omit<Job, 'id' | 'publicationDate' | 'updateAt'>
  ) => {
    try {
      const response = await fetch('http://localhost:8080/job_posting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          ...newJob,
          jobPostingStatus:
            newJob.jobPostingStatus === 'Ativo' ? 'ACTIVE' : 'INACTIVE',
        }),
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          id: updatedJob.id,
          title: updatedJob.title,
          description: updatedJob.description,
          jobPostingStatus:
            updatedJob.jobPostingStatus === 'Ativo' ? 'ACTIVE' : 'INACTIVE',
          address: updatedJob.address,
          applicationDeadline: updatedJob.applicationDeadline,
        }),
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
      const response = await fetch(
        `http://localhost:8080/job_posting/${jobId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) throw new Error('Erro ao excluir vaga');
      fetchJobs('COMPANY');
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <div className={styles.pageContainer}>
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
                ? 'Nenhuma postagem. Que tal criar uma?'
                : 'Nada por aqui. Se candidate em alguma vaga!'}
            </div>
          ) : (
            jobs.map((job) => {
              const isOwner =
                userRole === 'COMPANY' && userEmail === job.companyEmail;
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
    </div>
  );
};

export default VagasPage;
