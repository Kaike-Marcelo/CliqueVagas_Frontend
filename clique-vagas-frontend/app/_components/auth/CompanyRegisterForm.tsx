'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateCompanyDto } from '@/app/_services/types/Company';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Card, CardContent } from '../ui/card';
import { validarCNPJ } from '@/app/_lib/validarCNPJ';

interface CompanyRegisterFormProps {
  onRegister: (company: CreateCompanyDto) => void;
}

const schema = z
  .object({
    companyName: z.string().min(1, 'Nome da empresa é obrigatório'),
    cnpj: z
      .string()
      .min(1, 'CNPJ é obrigatório')
      .transform((val) => val.replace(/\D/g, '')) // Remove caracteres não numéricos
      .refine((val) => val.length === 14, {
        message: 'CNPJ deve ter 14 dígitos',
      })
      .refine((val) => validarCNPJ(val), { message: 'CNPJ inválido' }),
    telephoneResponsible: z
      .string()
      .min(1, 'Telefone é obrigatório')
      .transform((val) => val.replace(/\D/g, ''))
      .refine((val) => /^(\d{10,11})$/.test(val), {
        message: 'Número de telefone inválido (deve ter 10 ou 11 dígitos)',
      }),
    email: z.string().email('Endereço de e-mail inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A confirmação de senha deve ter pelo menos 6 caracteres'),
    firstName: z.string().min(1, 'Nome é obrigatório'),
    phone: z
      .string()
      .min(1, 'Número de telefone é obrigatório')
      .transform((val) => val.replace(/\D/g, ''))
      .refine((val) => /^(\d{10,11})$/.test(val), {
        message: 'Número de telefone inválido (deve ter 10 ou 11 dígitos)',
      }),
    cep: z.string().min(1, 'CEP é obrigatório'),
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(1, 'Estado é obrigatório'),
    country: z.string().min(1, 'País é obrigatório'),
    sectorOfOperation: z.string().min(1, 'Setor de operação é obrigatório'),
    websiteLink: z.string().url('URL inválida').optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export default function CompanyRegisterForm({
  onRegister,
}: CompanyRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    onRegister({
      address: {
        cep: data.cep,
        street: data.street,
        number: data.number,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        country: data.country,
      },
      user: {
        firstName: data.firstName,
        lastName: '',
        role: 'COMPANY',
        phone: data.phone,
        email: data.email,
        password: data.password,
        description: '',
      },
      company: {
        companyName: data.companyName,
        cnpj: data.cnpj,
        telephoneResponsible: data.telephoneResponsible,
        sectorOfOperation: data.sectorOfOperation,
        websiteLink: data.websiteLink ?? '',
      },
    });
  };

  return (
    <Card className="w-full flex">
      <CardContent className="flex-1 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Information */}
          <div className="space-y-4">
            <Label className="font-semibold">INFORMAÇÕES DA EMPRESA</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Nome da Empresa</Label>
                <Input
                  id="companyName"
                  className=""
                  placeholder="Nome da Empresa"
                  {...register('companyName')}
                />
                {errors.companyName && (
                  <p className="text-red-500">{errors.companyName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  className=""
                  placeholder="00.000.000/0000-00"
                  {...register('cnpj')}
                />
                {errors.cnpj && (
                  <p className="text-red-500">{errors.cnpj.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="telephoneResponsible">Telefone</Label>
                <Input
                  id="telephoneResponsible"
                  className=""
                  placeholder="(73) 91234-5678"
                  {...register('telephoneResponsible')}
                />
                {errors.telephoneResponsible && (
                  <p className="text-red-500">
                    {errors.telephoneResponsible.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    id="email"
                    className=""
                    placeholder="example@example.com"
                    {...register('email')}
                  />
                  <Button
                    type="button"
                    className="bg-blue-500 hover:bg-blue-700"
                  >
                    Verificar
                  </Button>
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  className=""
                  placeholder="********"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className=""
                  placeholder="********"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <Label className="font-semibold">INFORMAÇÕES DO RESPONSÁVEL</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  className=""
                  placeholder="Alberto Alves"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  className=""
                  placeholder="(73) 91234-5678"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-red-500">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-4">
            <Label className="font-semibold">ENDEREÇO</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  className=" "
                  placeholder="00000-000"
                  {...register('cep')}
                />
                {errors.cep && (
                  <p className="text-red-500">{errors.cep.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Rua</Label>
                <Input
                  id="street"
                  className=" "
                  placeholder="Camargo de Solimões"
                  {...register('street')}
                />
                {errors.street && (
                  <p className="text-red-500">{errors.street.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input
                  id="number"
                  className=" "
                  placeholder="123"
                  {...register('number')}
                />
                {errors.number && (
                  <p className="text-red-500">{errors.number.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input
                  id="neighborhood"
                  className=" "
                  placeholder="Sapucaeira"
                  {...register('neighborhood')}
                />
                {errors.neighborhood && (
                  <p className="text-red-500">{errors.neighborhood.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  className=" "
                  placeholder="Eunápolis"
                  {...register('city')}
                />
                {errors.city && (
                  <p className="text-red-500">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input
                  id="state"
                  className=" "
                  placeholder="BA"
                  {...register('state')}
                />
                {errors.state && (
                  <p className="text-red-500">{errors.state.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">País</Label>
                <Input
                  id="country"
                  className=" "
                  placeholder="Brasil"
                  {...register('country')}
                />
                {errors.country && (
                  <p className="text-red-500">{errors.country.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <Label className="font-semibold">INFORMAÇÕES ADICIONAIS</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sectorOfOperation">Setor de Atuação</Label>
                <Input
                  id="sectorOfOperation"
                  className=""
                  placeholder="Setor de Atuação"
                  {...register('sectorOfOperation')}
                />
                {errors.sectorOfOperation && (
                  <p className="text-red-500">
                    {errors.sectorOfOperation.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="websiteLink">Website (Opcional)</Label>
                <Input
                  id="websiteLink"
                  className=""
                  placeholder="https://www.example.com"
                  {...register('websiteLink')}
                />
                {errors.websiteLink && (
                  <p className="text-red-500">{errors.websiteLink.message}</p>
                )}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFA726] hover:bg-[#FF9800]"
          >
            Registrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
