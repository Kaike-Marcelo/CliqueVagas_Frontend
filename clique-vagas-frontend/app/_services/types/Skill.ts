export interface SkillModel {
  skillId: number;
  name: string;
  type: 'HARD_SKILL' | 'SOFT_SKILL';
}

export interface SkillIntermediateWithIdDto {
  id: number;
  idSkill: SkillModel;
  proficiencyLevel: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
}

export interface SkillJobPostDto {
  idSkill: number;
  proficiencyLevel: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  idJobPost: number;
}

export interface SkillIntermediateDto {
  idSkill: number;
  proficiencyLevel: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
}
