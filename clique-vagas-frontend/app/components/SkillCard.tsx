import { Badge } from './ui/badge';

interface Skill {
  setor: string;
  tipo: string;
  skill: string;
  nivel: string;
}

interface SkillCardProps {
  skill: Skill;
  index: number;
}
const SkillCard = ({ skill, index }: SkillCardProps) => {
  return (
    <div key={index} className="bg-secondary p-4 rounded-lg">
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{skill.setor}</span>
        <Badge variant="default">{skill.tipo}</Badge>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>Skill: {skill.skill}</p>
        <p>Nível: {skill.nivel}</p>
      </div>
    </div>
  );
};

export default SkillCard;
