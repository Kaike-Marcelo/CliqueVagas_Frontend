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
import { useState } from 'react';

const FormSchema = z.object({
  nome: z.string().nonempty('Nome do certificado é obrigatório'),
  instituicao: z.string().nonempty('Instituição Emissora é obrigatória'),
  dataEmissao: z.string().nonempty('Data de Emissão é obrigatória'),
  cargaHoraria: z.string().min(0, 'Carga Horária deve ser maior que 0'),
  anexo: z.any().optional(),
});

interface CertificateFormProps {
  onSubmit: (data: any) => void;
}

export function CertificateForm({ onSubmit }: CertificateFormProps) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      nome: '',
      instituicao: '',
      dataEmissao: '',
      cargaHoraria: 0,
      anexo: null,
    },
  });

  function handleSubmit(data: any) {
    onSubmit(data);
    form.reset();
    toggleDialog(false);
  }

  const [isDialogOpen, toggleDialog] = useState(false);

  return (
    <Dialog open={isDialogOpen} onOpenChange={toggleDialog}>
      <DialogTrigger className="w-full" asChild>
        <Button onClick={() => toggleDialog(true)}>
          Adicionar Certificado
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Certificado</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="nome"
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
              name="instituicao"
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
              name="dataEmissao"
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
              name="cargaHoraria"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Carga Horária</FormLabel>
                  <FormControl>
                    <input
                      type="time"
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
              name="anexo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anexo</FormLabel>
                  <FormControl>
                    <input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                      className="w-full p-2 border rounded-lg"
                    />
                  </FormControl>
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
