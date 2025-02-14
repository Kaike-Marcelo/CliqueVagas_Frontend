export interface Skill {
    skillId: number;
    name: string;
    type: 'HARD_SKILL' | 'SOFT_SKILL';
  }
  
  export interface SkillPosting {
    id?: number;
    name: string; // For display purposes. Does not go into the JSON
    idSkill: Skill;
    proficiencyLevel: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  }
