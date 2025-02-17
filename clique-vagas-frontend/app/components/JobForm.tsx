"use client";

import React, { useState, useEffect } from 'react';
import styles from './JobForm.module.css';
import { Skill, SkillPosting, SkillType, ProficiencyLevel } from '../interfaces/Skill';

interface JobFormProps {
    initialData?: {
        id?: number;
        title: string;
        description: string;
        jobPostingStatus: string;
        address: string;
        applicationDeadline: string;
        skills?: SkillPosting[];
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
        applicationDeadline: initialData?.applicationDeadline?.split('T')[0] || '',
        skills: initialData?.skills || []
    });

    const [newSkill, setNewSkill] = useState({
        type: 'HARD_SKILL',
        skillId: '',
        proficiencyLevel: 'BASIC'
    });
    
    const [availableSkills, setAvailableSkills] = useState<Skill[]>([]);
    const [loadingSkills, setLoadingSkills] = useState(false);

    useEffect(() => {
        if (initialData?.id) {
            fetchSkillsForJob();
        }
    }, [initialData?.id]);

    const fetchSkillsForJob = async () => {
        try {
            const response = await fetch(`http://localhost:8080/skill_posting/${initialData?.id}`);
            if (response.ok) {
                const data = await response.json();
                // Transforma os dados da API para o formato de SkillPosting
                const formattedSkills: SkillPosting[] = data.map((item: any) => ({
                    id: item.id,
                    idSkill: item.idSkill.skillId,
                    proficiencyLevel: item.proficiencyLevel as ProficiencyLevel,
                    name: item.idSkill.name,
                    type: item.idSkill.type as SkillType,
                }));
                setFormData(prev => ({ ...prev, skills: formattedSkills }));
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
        }
    };

    const fetchSkillsByType = async (type: SkillType) => {
        setLoadingSkills(true);
        try {
            const response = await fetch(`http://localhost:8080/skill/${type}`);
            if (response.ok) {
                const data = await response.json();
                setAvailableSkills(data);
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setLoadingSkills(false);
        }
    };

    const handleSkillTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const type = e.target.value as SkillType;
        setNewSkill(prev => ({ ...prev, type, skillId: '' }));
        await fetchSkillsByType(type);
    };

    const addSkill = () => {
        if (!newSkill.skillId) return;
        
        const skill = availableSkills.find(s => s.skillId === Number(newSkill.skillId));
        if (skill) {
            const newSkillPosting: SkillPosting = {
                idSkill: skill.skillId,
                proficiencyLevel: newSkill.proficiencyLevel as ProficiencyLevel,
                name: skill.name,
                type: skill.type
            };
            
            setFormData(prev => ({
                ...prev,
                skills: [...prev.skills, newSkillPosting]
            }));
            
            setNewSkill({
                type: 'HARD_SKILL',
                skillId: '',
                proficiencyLevel: 'BASIC'
            });
        }
    };

    const removeSkill = (index: number) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const jobData = {
            ...formData,
            applicationDeadline: new Date(formData.applicationDeadline).toISOString(),
            skills: undefined // Remove skills from main submit
        };

        const result = await onSubmit(jobData);
        
        // After successful job submit, handle skills
        if (formData.id && formData.skills.length > 0) {
            await handleSkillsSubmit(formData.id);
        }
    };

    const handleSkillsSubmit = async (jobId: number) => {
        try {
            // Delete all existing skills first
            if (initialData?.skills?.length) {
                await Promise.all(initialData.skills.map(async (skill) => {
                    await fetch(`http://localhost:8080/skill_posting/${skill.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                }));
            }

            // Add new skills
            await Promise.all(formData.skills.map(async (skill) => {
                await fetch('http://localhost:8080/skill_posting', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        idSkill: skill.idSkill,
                        proficiencyLevel: skill.proficiencyLevel,
                        idJobPost: jobId
                    })
                });
            }));
        } catch (error) {
            console.error('Error updating skills:', error);
        }
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
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Descrição:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Status:</label>
                        <select
                            name="jobPostingStatus"
                            value={formData.jobPostingStatus}
                            onChange={(e) => setFormData({ ...formData, jobPostingStatus: e.target.value })}
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
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Prazo Final:</label>
                        <input
                            type="date"
                            name="applicationDeadline"
                            value={formData.applicationDeadline}
                            onChange={(e) => setFormData({ ...formData, applicationDeadline: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Habilidades Requeridas:</label>
                        <div className={styles.skillSelector}>
                            <select 
                                value={newSkill.type} 
                                onChange={handleSkillTypeChange}
                            >
                                <option value="HARD_SKILL">Hard Skill</option>
                                <option value="SOFT_SKILL">Soft Skill</option>
                            </select>
                            
                            <select
                                value={newSkill.skillId}
                                onChange={(e) => setNewSkill(prev => ({...prev, skillId: e.target.value}))}
                                disabled={loadingSkills}
                            >
                                <option value="">Selecione uma habilidade</option>
                                {availableSkills.map(skill => (
                                    <option key={skill.skillId} value={skill.skillId}>
                                        {skill.name}
                                    </option>
                                ))}
                            </select>
                            
                            <select
                                value={newSkill.proficiencyLevel}
                                onChange={(e) => setNewSkill(prev => ({...prev, proficiencyLevel: e.target.value}))}
                            >
                                {Object.values(ProficiencyLevel).map(level => (
                                    <option key={level} value={level}>
                                        {level.charAt(0) + level.slice(1).toLowerCase()}
                                    </option>
                                ))}
                            </select>
                            
                            <button 
                                type="button" 
                                onClick={addSkill}
                                className={styles.addButton}
                            >
                                Adicionar
                            </button>
                        </div>
                        
                        <div className={styles.skillsList}>
                            {formData.skills.map((skill, index) => (
                                <div key={index} className={styles.skillTag}>
                                    <span>
                                        {skill.name} ({skill.type === 'HARD_SKILL' ? 'Hard' : 'Soft'}) - 
                                        {skill.proficiencyLevel.toLowerCase()}
                                    </span>
                                    <button 
                                        type="button" 
                                        onClick={() => removeSkill(index)}
                                        className={styles.removeSkill}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
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
