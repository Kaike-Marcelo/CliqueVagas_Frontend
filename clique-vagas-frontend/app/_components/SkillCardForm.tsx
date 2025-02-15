'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useState, useEffect } from 'react';
import { getSkillsByType, addSkillIntern } from '@/app/_services/skillService';
import {
  SkillModel,
  SkillIntermediateWithIdDto,
  SkillIntermediateDto,
} from '@/app/_services/types/Skill';

const FormSchema = z.object({
  tipo: z.string().nonempty('Selecione um tipo.'),
  skill: z.string().nonempty('Selecione uma habilidade.'),
  nivel: z.string().nonempty('Selecione um nível.'),
});

interface SkillCardFormProps {
  onSubmit: (data: SkillIntermediateWithIdDto) => void;
}

export function SkillCardForm({ onSubmit }: SkillCardFormProps) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tipo: '',
      skill: '',
      nivel: '',
    },
  });

  const [skills, setSkills] = useState<SkillModel[]>([]);
  const [levels] = useState([
    { value: 'BASIC', label: 'Básico' },
    { value: 'INTERMEDIATE', label: 'Intermediário' },
    { value: 'ADVANCED', label: 'Avançado' },
    { value: 'EXPERT', label: 'Especialista' },
  ]);

  useEffect(() => {
    const tipo = form.getValues('tipo');
    if (tipo) fetchSkillsByType(tipo as 'HARD_SKILL' | 'SOFT_SKILL');
  }, [form.getValues('tipo')]);

  const fetchSkillsByType = async (type: 'HARD_SKILL' | 'SOFT_SKILL') => {
    try {
      const fetchedSkills = await getSkillsByType(type);
      setSkills(fetchedSkills);
    } catch (error) {
      console.error('Erro ao buscar habilidades:', error);
    }
  };

  const handleSubmit = async (data: any) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    const selectedSkill = skills.find(
      (skill) => skill.skillId === parseInt(data.skill)
    );
    if (!selectedSkill) {
      console.error('Skill não encontrada');
      return;
    }

    const skillDto: SkillIntermediateDto = {
      idSkill: selectedSkill.skillId,
      proficiencyLevel: data.nivel as
        | 'BASIC'
        | 'INTERMEDIATE'
        | 'ADVANCED'
        | 'EXPERT',
    };

    try {
      const addedSkill = await addSkillIntern(skillDto, token);
      console.log('Skill adicionada:', addedSkill);

      const skillWithId: SkillIntermediateWithIdDto = {
        id: addedSkill,
        idSkill: {
          skillId: selectedSkill.skillId,
          name: selectedSkill.name,
          type: selectedSkill.type,
        },
        proficiencyLevel: skillDto.proficiencyLevel,
      };

      form.reset();
      toggleDialog(false);
      onSubmit(skillWithId); // Passando o objeto SkillIntermediateWithIdDto para a função onSubmit
    } catch (error) {
      console.error('Erro ao adicionar skill:', error);
      console.error('Skill:', skillDto);
    }
  };

  const [isDialogOpen, toggleDialog] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogTrigger className="w-full" asChild>
        <Button variant="default">Adicionar Skill +</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Skill</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="HARD_SKILL">Hard Skill</SelectItem>
                      <SelectItem value="SOFT_SKILL">Soft Skill</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="skill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habilidade</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma habilidade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skills.map((skill) => (
                        <SelectItem
                          key={skill.skillId}
                          value={skill.skillId.toString()}
                        >
                          {skill.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nivel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um nível" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {levels.map((nivel) => (
                        <SelectItem key={nivel.value} value={nivel.value}>
                          {nivel.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
