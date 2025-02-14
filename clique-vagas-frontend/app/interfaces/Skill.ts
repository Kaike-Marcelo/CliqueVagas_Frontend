export interface Skill {
    skillId: number;
    name: string;
    type: 'HARD_SKILL' | 'SOFT_SKILL';
  }
  
  export interface SkillPosting {
    id?: number;
    idSkill: Skill;
    proficiencyLevel: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  }
