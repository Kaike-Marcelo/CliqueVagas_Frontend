import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

interface Certificado {
  title: string;
  image: string;
}

interface CertificadosProps {
  certificados: Certificado[];
}

const Certificados: React.FC<CertificadosProps> = ({ certificados }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <p className="mt-2 text-center font-medium">{cert.title}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Todos os Certificados</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {certificados.map((cert, index) => (
              <div key={index} className="group relative">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <p className="mt-2 text-center font-medium">{cert.title}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Certificados;
