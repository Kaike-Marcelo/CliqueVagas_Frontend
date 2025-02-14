export interface Skill {
    skillId: number;
    name: string;
    type: 'HARD_SKILL' | 'SOFT_SKILL';
  }
  
  export interface SkillPosting {
    id?: number;
    idSkill: number;
    proficiencyLevel: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
    name: string; // For display purposes. Does not go into the JSON
    type: 'HARD_SKILL' | 'SOFT_SKILL'; // Also for display purposes
  }
