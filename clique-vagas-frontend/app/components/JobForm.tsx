"use client";

import React, { useState } from 'react';
import styles from './JobForm.module.css';

interface JobFormProps {
    initialData?: {
        id?: number;
        title: string;
        description: string;
        jobPostingStatus: string;
        address: string;
        applicationDeadline: string;
    };
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

const JobForm: React.FC<JobFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        id: initialData?.id,
        title: initialData?.title || '',
        description: initialData?.description || '',
        jobPostingStatus: initialData?.jobPostingStatus || 'Ativo',
        address: initialData?.address || '',
        applicationDeadline: initialData
            ? initialData.applicationDeadline.split('T')[0]
            : ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            applicationDeadline: new Date(formData.applicationDeadline).toISOString()
        });
    };

    return (
        <div className={styles.formOverlay}>
            <div className={styles.formContainer}>
                <h2>{initialData ? 'Editar Vaga' : 'Criar Vaga'}</h2>
                <form onSubmit={handleSubmit}>
                    {initialData?.id && (
                        <input type="hidden" name="id" value={formData.id} />
                    )}
                    
                    <div className={styles.formGroup}>
                        <label>Título:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Descrição:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Status:</label>
                        <select
                            name="jobPostingStatus"
                            value={formData.jobPostingStatus}
                            onChange={handleChange}
                        >
                            <option value="Ativo">Ativo</option>
                            <option value="Inativo">Inativo</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Endereço:</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Prazo Final:</label>
                        <input
                            type="date"
                            name="applicationDeadline"
                            value={formData.applicationDeadline}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formButtons}>
                        <button type="button" onClick={onCancel} className={styles.cancelButton}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobForm;
