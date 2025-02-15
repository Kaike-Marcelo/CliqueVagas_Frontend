import { Badge } from '@/app/_components/ui/badge';
import { Card, CardContent } from '@/app/_components/ui/card';
import { SkillIntermediateWithIdDto } from '@/app/_services/types/Skill';
import { Label } from './ui/label';
import { deleteSkillIntern } from '@/app/_services/skillService';
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/app/_components/ui/alert-dialog';

interface SkillCardProps {
  skill: SkillIntermediateWithIdDto;
  onDelete: (id: number) => void;
}

const SkillCard = ({ skill, onDelete }: SkillCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteSkillIntern(skill.id);
      onDelete(skill.id);
    } catch (error) {
      console.error('Erro ao deletar skill:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card className="bg-secondary rounded-lg cursor-pointer">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <Label className="font-medium">{skill.idSkill.type}</Label>
              <Badge variant="default">{skill.proficiencyLevel}</Badge>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-muted-foreground">
                <Label>Skill: {skill.idSkill.name}</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Deseja Excluir?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita. Isso excluirá permanentemente a
            skill.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SkillCard;
