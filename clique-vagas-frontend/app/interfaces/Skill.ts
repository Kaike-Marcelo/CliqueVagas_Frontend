export enum SkillType {
  HARD_SKILL = 'HARD_SKILL',
  SOFT_SKILL = 'SOFT_SKILL',
}

export enum ProficiencyLevel {
  BASIC = 'BASIC',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT',
}

export interface Skill { // Utilizar em formulários
  skillId: number;
  name: string;
  type: SkillType;
}

export interface SkillPosting { // Utilizar em postagens de vagas
  id?: number;
  idSkill: number;
  proficiencyLevel: ProficiencyLevel;
  // Propriedades para exibição; não entram no JSON
  name: string;
  type: SkillType;
}
