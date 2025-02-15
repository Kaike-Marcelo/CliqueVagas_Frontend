import React, { useState } from 'react';
import { Award, Settings, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
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

interface CertificadosProps {
  certificados: Certificate[];
  setCertificados: React.Dispatch<React.SetStateAction<Certificate[]>>;
}

const Certificados: React.FC<CertificadosProps> = ({
  certificados,
  setCertificados,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleDeleteCertificado = (index: number) => {
    const updatedCertificados = certificados.filter((_, i) => i !== index);
    setCertificados(updatedCertificados);
    setIsDialogOpen(false);
    setTimeout(() => setIsDialogOpen(true), 0);
  };

  const handleAddCertificado = (newCertificado: Certificate) => {
    setCertificados([...certificados, newCertificado]);
    setIsDialogOpen(false);
    setTimeout(() => setIsDialogOpen(true), 0);
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
        <div className="flex space-x-4">
          {certificados.map((cert, index) => (
            <div key={index} className="group relative min-w-[150px]">
              <div className="aspect-square rounded-lg overflow-hidden">
                <img
                  src={cert.file}
                  alt={cert.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Award className="text-white h-8 w-8" />
              </div>
              <p className="mt-2 text-center font-medium">{cert.name}</p>
            </div>
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
                      src={cert.file}
                      alt={cert.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
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
                          onClick={() => handleDeleteCertificado(index)}
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
            <CertificateForm onSubmit={handleAddCertificado} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificados;
