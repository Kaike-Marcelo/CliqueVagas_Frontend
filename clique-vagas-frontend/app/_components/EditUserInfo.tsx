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
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { useState } from 'react';
import { EditIcon } from 'lucide-react';

const FormSchema = z.object({
  nome: z.string().nonempty('Nome é obrigatório.'),
  sobrenome: z.string().nonempty('Sobrenome é obrigatório.'),
  cpf: z.string().nonempty('CPF é obrigatório.'),
  telefone: z.string().nonempty('Telefone é obrigatório.'),
  email: z.string().nonempty('E-mail é obrigatório.').email('E-mail inválido.'),
  rua: z.string().nonempty('Rua é obrigatória.'),
  numero: z.string().nonempty('Número é obrigatório.'),
  cep: z.string().nonempty('CEP é obrigatório.'),
  bairro: z.string().nonempty('Bairro é obrigatório.'),
  cidade: z.string().nonempty('Cidade é obrigatória.'),
  estado: z.string().nonempty('Estado é obrigatório.'),
  instituicao: z.string().nonempty('Instituição é obrigatória.'),
  areaInteresse: z.string().nonempty('Área de interesse é obrigatória.'),
  anoIngresso: z.string().nonempty('Ano de ingresso é obrigatório.'),
  previsaoFormatura: z
    .string()
    .nonempty('Previsão de formatura é obrigatória.'),
});

interface EditUserInfoProps {
  userInfo: any;
  onSave: (data: any) => void;
}

export function EditUserInfo({ userInfo, onSave }: EditUserInfoProps) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: userInfo,
  });

  function handleSubmit(data: any) {
    onSave(data);
    form.reset();
    toggleDialog(false);
  }

  const [isDialogOpen, toggleDialog] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogTrigger className="w-full" asChild>
        <Button variant="outline">
          <EditIcon className="w-6 h-6 mr-2" />
          Alterar Dados
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Alterar Informações Pessoais</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sobrenome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Sobrenome" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="CPF" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Telefone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="E-mail" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rua"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rua</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Rua" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Número" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="CEP" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bairro"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Bairro" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cidade"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cidade</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Cidade" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estado"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estado</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Estado" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="instituicao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instituição de Ensino</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Instituição de Ensino" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="areaInteresse"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Área de Interesse</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Área de Interesse" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="anoIngresso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano de Ingresso</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ano de Ingresso" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="previsaoFormatura"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previsão de Formatura</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Previsão de Formatura" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="col-span-3">
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
