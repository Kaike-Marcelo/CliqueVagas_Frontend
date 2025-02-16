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
import { GetUserWithAddressDto, UpdateUserDto } from '../_services/types/User';
import { PostInternDto } from '../_services/types/Intern';
import { updateUser, putUserAddressById } from '../_services/userService';
import { updateIntern } from '../_services/internService';
import { Address } from '../_services/types/Address';
import { Textarea } from './ui/textarea';

const FormSchema = z.object({
  firstName: z.string().nonempty('Nome é obrigatório.'),
  lastName: z.string().nonempty('Sobrenome é obrigatório.'),
  cpf: z.string().nonempty('CPF é obrigatório.'),
  phone: z.string().nonempty('Telefone é obrigatório.'),
  email: z.string().nonempty('E-mail é obrigatório.').email('E-mail inválido.'),
  description: z.string().nonempty('Objetivo é obrigatório.'),
  street: z.string().nonempty('Rua é obrigatória.'),
  number: z.string().nonempty('Número é obrigatório.'),
  cep: z.string().nonempty('CEP é obrigatório.'),
  neighborhood: z.string().nonempty('Bairro é obrigatório.'),
  city: z.string().nonempty('Cidade é obrigatória.'),
  state: z.string().nonempty('Estado é obrigatório.'),
  educationalInstitution: z.string().nonempty('Instituição é obrigatória.'),
  areaOfInterest: z.string().nonempty('Área de interesse é obrigatória.'),
  yearOfEntry: z.string().nonempty('Ano de ingresso é obrigatório.'),
  expectedGraduationDate: z
    .string()
    .nonempty('Previsão de formatura é obrigatória.'),
});

interface EditUserInfoProps {
  userInfo: GetUserWithAddressDto;
  onSave: (data: GetUserWithAddressDto) => void;
}

export function EditUserInfo({ userInfo, onSave }: EditUserInfoProps) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...userInfo.user,
      ...userInfo.address,
      ...userInfo.intern,
      description: userInfo.user.description || '',
    },
  });

  async function handleSubmit(data: any) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    const updatedUser: UpdateUserDto = {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      description: data.description,
    };

    const updatedAddress: Address = {
      id: userInfo.address.id,
      cep: data.cep,
      street: data.street,
      number: data.number,
      neighborhood: data.neighborhood,
      city: data.city,
      state: data.state,
      country: userInfo.address.country,
    };

    const updatedIntern: PostInternDto = {
      cpf: data.cpf,
      educationalInstitution: data.educationalInstitution,
      areaOfInterest: data.areaOfInterest,
      yearOfEntry: parseInt(data.yearOfEntry),
      expectedGraduationDate: data.expectedGraduationDate,
      dateOfBirth: userInfo.intern?.dateOfBirth || '',
      sex: userInfo.intern?.sex || 'OTHER',
    };

    try {
      await updateUser(updatedUser, token);
      await putUserAddressById(userInfo.address.id, updatedAddress);
      await updateIntern(updatedIntern, token);

      const updatedUserInfo: GetUserWithAddressDto = {
        user: {
          ...userInfo.user,
          ...updatedUser,
        },
        address: {
          ...userInfo.address,
          ...updatedAddress,
        },
        intern: {
          ...userInfo.intern,
          ...updatedIntern,
        },
      };

      onSave(updatedUserInfo);
      form.reset();
      toggleDialog(false);
      console.log('Informações atualizadas com sucesso:', updatedUserInfo);
    } catch (error) {
      console.error('Erro ao atualizar informações:', error);
    }
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
              name="firstName"
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
              name="lastName"
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
              name="phone"
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
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Objetivo</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Objetivo" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
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
              name="number"
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
              name="neighborhood"
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
              name="city"
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
              name="state"
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
              name="educationalInstitution"
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
              name="areaOfInterest"
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
              name="yearOfEntry"
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
              name="expectedGraduationDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previsão de Formatura</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
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
