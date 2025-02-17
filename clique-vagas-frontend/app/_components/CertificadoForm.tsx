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
import { CertificateDto } from '../_services/types/Certificate';

const FormSchema = z.object({
  name: z.string().nonempty('Nome do certificado é obrigatório'),
  institution: z.string().nonempty('Instituição Emissora é obrigatória'),
  issuanceDate: z.string().nonempty('Data de Emissão é obrigatória'),
  creditHours: z
    .string()
    .min(1, 'Carga Horária deve ser maior que 0')
    .transform(Number),
  description: z.string().nonempty('Descrição é obrigatória'),
  file: z.any().optional(),
});

interface CertificateFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: CertificateDto | null;
}

export function CertificateForm({
  onSubmit,
  initialData,
}: CertificateFormProps) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: initialData || {
      name: '',
      institution: '',
      issuanceDate: '',
      creditHours: 0,
      description: '',
      file: null as any,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        institution: initialData.institution,
        issuanceDate: initialData.issuanceDate,
        creditHours: initialData.creditHours,
        description: initialData.description || '',
        file: initialData.file || (null as any),
      });
    }
  }, [initialData, form]);

  function handleSubmit(data: any) {
    console.log('Form data before submission:', data);

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('institution', data.institution);
    formData.append('issuanceDate', data.issuanceDate);
    formData.append('creditHours', data.creditHours.toString());
    if (data.description) {
      formData.append('description', data.description);
    }
    if (data.file) {
      formData.append('file', data.file);
    }

    onSubmit(formData);
    form.reset();
    toggleDialog(false);
  }

  const [isDialogOpen, toggleDialog] = useState(false);

  useEffect(() => {
    console.log('Dialog state changed:', isDialogOpen);
  }, [isDialogOpen]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogTrigger className="w-full" asChild>
        <Button onClick={() => toggleDialog(true)}>
          {initialData ? 'Editar Certificado' : 'Adicionar Certificado'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Editar Certificado' : 'Adicionar Novo Certificado'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              console.log('Form data before submission:', data);
              handleSubmit(data);
            })}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Digite o nome do certificado"
                      {...field}
                      className="w-full p-2 border rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="institution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instituição Emissora</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      placeholder="Digite o nome da instituição"
                      {...field}
                      className="w-full p-2 border rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issuanceDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Emissão</FormLabel>
                  <FormControl>
                    <input
                      type="date"
                      {...field}
                      className="w-full p-2 border rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="creditHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga Horária</FormLabel>
                  <FormControl>
                    <input
                      type="number"
                      placeholder="Digite a carga horária"
                      {...field}
                      className="w-full p-2 border rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Digite a descrição do certificado"
                      {...field}
                      className="w-full p-2 border rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anexo</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      onChange={(e) => {
                        console.log('File selected:', e.target.files?.[0]);
                        field.onChange(e.target.files?.[0]);
                      }}
                      className="w-full p-2 border rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                onClick={() => console.log('Submit button clicked')}
              >
                Salvar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
