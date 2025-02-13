'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreateInternDto } from '@/app/_services/types/Intern';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../ui/select';
import { Card, CardContent } from '../ui/card';

interface InternRegisterFormProps {
  onRegister: (intern: CreateInternDto) => void;
}

const schema = z
  .object({
    firstName: z.string().min(1, 'Nome é obrigatório'),
    lastName: z.string().min(1, 'Sobrenome é obrigatório'),
    email: z.string().email('Endereço de e-mail inválido'),
    phone: z.string().min(1, 'Número de telefone é obrigatório'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    confirmPassword: z
      .string()
      .min(6, 'A confirmação da senha deve ter pelo menos 6 caracteres'),
    description: z.string().min(1, 'Descrição é obrigatória'),
    dateOfBirth: z.string().min(1, 'Data de nascimento é obrigatória'),
    sex: z.enum(['M', 'F', 'OTHER']),
    cpf: z.string().min(1, 'CPF é obrigatório'),
    educationalInstitution: z
      .string()
      .min(1, 'Instituição de ensino é obrigatória'),
    areaOfInterest: z.string().min(1, 'Área de interesse é obrigatória'),
    yearOfEntry: z.number().min(1, 'Ano de ingresso é obrigatório'),
    expectedGraduationDate: z
      .string()
      .min(1, 'Data prevista de formatura é obrigatória'),
    cep: z.string().min(1, 'CEP é obrigatório'),
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    state: z.string().min(1, 'Estado é obrigatório'),
    country: z.string().min(1, 'País é obrigatório'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })
  .refine((data) => data.sex !== undefined, {
    message: 'Sexo é obrigatório',
    path: ['sex'],
  });

type FormData = z.infer<typeof schema>;

export default function InternRegisterForm({
  onRegister,
}: InternRegisterFormProps) {
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
        lastName: data.lastName,
        role: 'INTERN',
        phone: data.phone,
        email: data.email,
        password: data.password,
        description: data.description,
      },
      intern: {
        dateOfBirth: data.dateOfBirth,
        sex: data.sex,
        cpf: data.cpf,
        educationalInstitution: data.educationalInstitution,
        areaOfInterest: data.areaOfInterest,
        yearOfEntry: data.yearOfEntry,
        expectedGraduationDate: data.expectedGraduationDate,
      },
    });
  };

  return (
    <main className="flex items-center justify-center py-4">
      <Card className="w-full flex">
        <CardContent className="flex-1 py-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <Label className="font-semibold">INFORMAÇÕES PESSOAIS</Label>
              <div className="grid grid-cols-2 gap-4">
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
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    className=" "
                    placeholder="Almeida Amorim"
                    {...register('lastName')}
                  />
                  {errors.lastName && (
                    <p className="text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input
                    id="cpf"
                    className=" "
                    placeholder="123.456.789-00"
                    {...register('cpf')}
                  />
                  {errors.cpf && (
                    <p className="text-red-500">{errors.cpf.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Nascimento</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    className=" "
                    {...register('dateOfBirth')}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500">{errors.dateOfBirth.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
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
                <div className="space-y-2">
                  <Label htmlFor="sex">Sexo</Label>
                  <Select {...register('sex')}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="M">Homem</SelectItem>
                      <SelectItem value="F">Mulher</SelectItem>
                      <SelectItem value="OTHER">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sex && (
                    <p className="text-red-500">{errors.sex.message}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="email"
                      className=""
                      placeholder="example@example.com"
                      {...register('email')}
                    />
                    <Button
                      type="button"
                      className="bg-blue-500 hover:bg-blue-700 text-white"
                    >
                      Verificar
                    </Button>
                  </div>
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  className=" "
                  placeholder="Descreva-se"
                  {...register('description')}
                />
                {errors.description && (
                  <p className="text-red-500">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Address Section */}
            <div className="space-y-4">
              <Label className="font-semibold">ENDEREÇO</Label>
              <div className="grid grid-cols-3 gap-4">
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
                    <p className="text-red-500">
                      {errors.neighborhood.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
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

            {/* Education Section */}
            <div className="space-y-4">
              <Label className="font-semibold">EDUCAÇÃO</Label>
              <div className="space-y-2">
                <Label htmlFor="educationalInstitution">
                  Instituição de Ensino
                </Label>
                <Input
                  id="educationalInstitution"
                  className=" "
                  placeholder="IFBA"
                  {...register('educationalInstitution')}
                />
                {errors.educationalInstitution && (
                  <p className="text-red-500">
                    {errors.educationalInstitution.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="areaOfInterest">Área de interesse</Label>
                <Input
                  id="areaOfInterest"
                  className=" "
                  placeholder="Marketing"
                  {...register('areaOfInterest')}
                />
                {errors.areaOfInterest && (
                  <p className="text-red-500">
                    {errors.areaOfInterest.message}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="yearOfEntry">Ano de Ingresso</Label>
                  <Input
                    id="yearOfEntry"
                    className=" "
                    placeholder="2018"
                    type="number"
                    {...register('yearOfEntry')}
                  />
                  {errors.yearOfEntry && (
                    <p className="text-red-500">{errors.yearOfEntry.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedGraduationDate">
                    Prev. de Formatura
                  </Label>
                  <Input
                    id="expectedGraduationDate"
                    type="date"
                    className=" "
                    {...register('expectedGraduationDate')}
                  />
                  {errors.expectedGraduationDate && (
                    <p className="text-red-500">
                      {errors.expectedGraduationDate.message}
                    </p>
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
    </main>
  );
}
