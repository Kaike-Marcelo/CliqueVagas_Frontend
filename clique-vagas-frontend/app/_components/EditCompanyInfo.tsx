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
import { Textarea } from './ui/textarea';
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
import { UpdateCompanyDto } from '../_services/types/Company';
import { Address } from '../_services/types/Address';
import { updateUser, putUserAddressById } from '../_services/userService';
import { updateCompany } from '../_services/companyService';

const FormSchema = z.object({
  companyName: z.string().nonempty('Nome da empresa é obrigatório.'),
  cnpj: z.string().nonempty('CNPJ é obrigatório.'),
  phone: z.string().nonempty('Telefone é obrigatório.'),
  telephoneResponsible: z
    .string()
    .nonempty('Telefone do responsável é obrigatório.'),
  email: z.string().nonempty('E-mail é obrigatório.').email('E-mail inválido.'),
  street: z.string().nonempty('Rua é obrigatória.'),
  number: z.string().nonempty('Número é obrigatório.'),
  cep: z.string().nonempty('CEP é obrigatório.'),
  neighborhood: z.string().nonempty('Bairro é obrigatório.'),
  city: z.string().nonempty('Cidade é obrigatória.'),
  state: z.string().nonempty('Estado é obrigatório.'),
  sectorOfOperation: z.string().nonempty('Setor de atuação é obrigatório.'),
  websiteLink: z.string().url('URL inválida.').optional(),
  description: z.string().nonempty('Descrição é obrigatória.'),
});

interface EditCompanyInfoProps {
  userInfo: GetUserWithAddressDto;
  onSave: (data: GetUserWithAddressDto) => void;
}

export function EditCompanyInfo({ userInfo, onSave }: EditCompanyInfoProps) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      ...userInfo.company,
      ...userInfo.address,
      email: userInfo.user.email,
      phone: userInfo.user.phone,
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

    const updatedCompany: UpdateCompanyDto = {
      companyName: data.companyName,
      cnpj: data.cnpj,
      sectorOfOperation: data.sectorOfOperation,
      websiteLink: data.websiteLink,
      telephoneResponsible: data.telephoneResponsible,
    };

    try {
      await updateUser(updatedUser, token);
      await putUserAddressById(userInfo.address.id, updatedAddress);
      await updateCompany(updatedCompany, token);

      const updatedUserInfo: GetUserWithAddressDto = {
        ...userInfo,
        user: {
          ...userInfo.user,
          ...updatedUser,
        },
        address: {
          ...userInfo.address,
          ...updatedAddress,
        },
        company: {
          ...userInfo.company,
          ...updatedCompany,
        },
      };

      onSave(updatedUserInfo);
      form.reset();
      toggleDialog(false);
      console.log(
        'Informações da empresa atualizadas com sucesso:',
        updatedUserInfo
      );
    } catch (error) {
      console.error('Erro ao atualizar informações da empresa:', error);
    }
  }

  const [isDialogOpen, toggleDialog] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogTrigger className="w-full" asChild>
        <Button variant="outline">
          <EditIcon className="w-6 h-6 mr-2" />
          Alterar Dados da Empresa
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Alterar Informações da Empresa</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome da Empresa</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Nome da Empresa" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="CNPJ" />
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
              name="telephoneResponsible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone do Responsável</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Telefone do Responsável" />
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
                <FormItem className="col-span-1 md:col-span-3">
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Descrição" />
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
              name="sectorOfOperation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setor de Atuação</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Setor de Atuação" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="websiteLink"
              render={({ field }) => (
                <FormItem className="col-span-1 md:col-span-3">
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="https://empresa.com.br" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="col-span-1 md:col-span-3">
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
