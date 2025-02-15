import { apiFetch } from './api';
import {
  SkillModel,
  SkillIntermediateWithIdDto,
  SkillJobPostDto,
  SkillIntermediateDto,
} from './types/Skill';

export async function getAllSkills(): Promise<SkillModel[]> {
  return apiFetch<SkillModel[]>('/skill', 'GET');
}

export async function getSkillsByType(
  type: 'HARD_SKILL' | 'SOFT_SKILL'
): Promise<SkillModel[]> {
  return apiFetch<SkillModel[]>(`/skill/${type}`, 'GET');
}

export async function addSkill(skill: SkillModel): Promise<SkillModel> {
  return apiFetch<SkillModel>('/skill', 'POST', {
    body: JSON.stringify(skill),
  });
}

export async function getAllSkillsPostByIdCompany(
  token: string
): Promise<SkillIntermediateWithIdDto[]> {
  return apiFetch<SkillIntermediateWithIdDto[]>('/skill_posting', 'GET', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Função para adicionar uma skill a um job posting
export async function addSkillJobPost(
  skillJobPost: SkillJobPostDto
): Promise<number> {
  return apiFetch<number>('/skill_posting', 'POST', {
    body: JSON.stringify(skillJobPost),
  });
}

// Função para atualizar uma skill de um job posting
export async function updateSkillJobPost(
  skillJobPost: SkillIntermediateWithIdDto,
  token: string
): Promise<void> {
  return apiFetch<void>('/skill_posting', 'PUT', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(skillJobPost),
  });
}

// Função para obter todas as skills de um intern por token
export async function getAllSkillsIntern(
  token: string
): Promise<SkillIntermediateWithIdDto[]> {
  return apiFetch<SkillIntermediateWithIdDto[]>(`/skill_intern`, 'GET', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Função para adicionar uma skill a um intern
export async function addSkillIntern(
  skillIntern: SkillIntermediateDto,
  token: string
): Promise<number> {
  if (!skillIntern.idSkill || isNaN(skillIntern.idSkill)) {
    console.error('ID da skill inválido:', skillIntern.idSkill);
    throw new Error('ID da skill inválido');
  }

  if (!token) {
    console.error('Token de autenticação ausente');
    throw new Error('Token de autenticação é necessário');
  }

  return apiFetch<number>('/skill_intern', 'POST', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idSkill: skillIntern.idSkill,
      proficiencyLevel: skillIntern.proficiencyLevel,
    }),
  });
}

// Função para atualizar uma skill de um intern
export async function updateSkillIntern(
  skillIntern: SkillIntermediateWithIdDto,
  token: string
): Promise<void> {
  return apiFetch<void>('/skill_intern', 'PUT', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(skillIntern),
  });
}

// Função para deletar uma skill
export async function deleteSkill(id: number): Promise<void> {
  return apiFetch<void>(`/skill/${id}`, 'DELETE');
}

// Função para deletar uma skill de um job posting
export async function deleteSkillJobPost(
  id: number,
  token: string
): Promise<void> {
  return apiFetch<void>(`/skill_posting/${id}`, 'DELETE', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Função para deletar uma skill de um intern
export async function deleteSkillIntern(id: number): Promise<void> {
  return apiFetch<void>(`/skill_intern/${id}`, 'DELETE');
}
