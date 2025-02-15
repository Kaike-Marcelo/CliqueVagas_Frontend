import { Badge } from '@/app/_components/ui/badge';
import { Card, CardContent } from '@/app/_components/ui/card';
import { SkillIntermediateWithIdDto } from '@/app/_services/types/Skill';
import { Label } from './ui/label';

interface SkillCardProps {
  skill: SkillIntermediateWithIdDto;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <Card className="bg-secondary rounded-lg">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <Label className="font-medium">{skill.idSkill.type}</Label>
          <Badge variant="default">{skill.proficiencyLevel}</Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          <Label>Skill: {skill.idSkill.name}</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
