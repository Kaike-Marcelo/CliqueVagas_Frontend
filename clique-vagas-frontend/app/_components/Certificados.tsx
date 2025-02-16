import React, { useState } from 'react';
import { Award, Settings, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { CertificateForm } from './CertificadoForm';
import { Certificate } from '../_services/types/Certificate';
import {
  addCertificate,
  deleteCertificate,
  updateCertificate,
} from '../_services/certificateService';
import CertificateDetails from './CertificateDetails';
import { Button } from './ui/button';

interface CertificadosProps {
  certificados: Certificate[];
  onAdd: (certificate: Certificate) => Promise<void>;
  onUpdate: (formData: FormData) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

const Certificados = ({
  certificados,
  onAdd,
  onUpdate,
  onDelete,
}: CertificadosProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteCertificado = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }
    try {
      const deletar = await deleteCertificate(id, token);
      console.log('Certificado deletado:', deletar);
      onDelete(id);
      setIsDialogOpen(false);
      setTimeout(() => setIsDialogOpen(true), 0);
    } catch (error) {
      console.error('Erro ao deletar certificado:', error);
    }
  };

  const handleAddCertificado = async (formData: FormData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }
    try {
      const newId = await addCertificate(formData, token);
      const newCertificado: Certificate = {
        id: newId,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        institution: formData.get('institution') as string,
        issuanceDate: formData.get('issuanceDate') as string,
        creditHours: parseInt(formData.get('creditHours') as string),
        file: formData.get('file') as any,
      };
      onAdd(newCertificado);
      setIsDialogOpen(false);
      setTimeout(() => setIsDialogOpen(true), 0);
    } catch (error) {
      console.error('Erro ao adicionar certificado:', error);
    }
  };

  const handleUpdateCertificado = async (formData: FormData) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    try {
      await updateCertificate(formData, token);
      onUpdate(formData);
      setSelectedCertificate(null);
      setIsDialogOpen(false);
      setTimeout(() => setIsDialogOpen(true), 0);
    } catch (error) {
      console.error('Erro ao atualizar certificado:', error);
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Data não disponível';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Certificados</h2>
        <button
          onClick={handleOpenDialog}
          className="text-gray-500 hover:text-gray-700"
        >
          <Settings className="w-6 h-6" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="flex space-x-4 max-h-[200px]">
          {certificados.map((cert, index) => (
            <AlertDialog key={index}>
              <AlertDialogTrigger asChild>
                <div className="group relative max-w-[120px] cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden min-h-[60%]">
                    <img
                      src="/img/certificado.svg"
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Award className="text-white h-8 w-8" />
                  </div>
                  <p className="mt-2 text-center font-medium">{cert.name}</p>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Detalhes do Certificado</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                  Aqui estão os detalhes do certificado selecionado.
                </AlertDialogDescription>
                <CertificateDetails certificate={cert} />
                <AlertDialogFooter>
                  <AlertDialogCancel asChild>
                    <Button variant="secondary">Fechar</Button>
                  </AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Todos os Certificados</DialogTitle>
          </DialogHeader>
          <div className="max-h-96 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
              {certificados.map((cert, index) => (
                <div key={index} className="group relative min-w-[100px]">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src="/img/certificado.svg"
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-100"
                    />
                  </div>
                  <p className="mt-2 text-center font-medium">{cert.name}</p>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Badge
                        className="absolute top-1 right-1 px-1"
                        variant="default"
                      >
                        <Trash2 className="w-4 h-4 text-white hover:text-red-700" />
                      </Badge>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Deseja realmente excluir?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteCertificado(cert.id)}
                        >
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <CertificateForm
              onSubmit={
                selectedCertificate
                  ? handleUpdateCertificado
                  : handleAddCertificado
              }
              initialData={selectedCertificate}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificados;
