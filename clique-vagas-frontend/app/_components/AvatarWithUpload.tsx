import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
import { Button } from '@/app/_components/ui/button';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/app/_components/ui/alert-dialog';
import UploadAvatar from '@/app/_components/UploadAvatar';
import { getPhotoProfile } from '../_services/userService';

interface AvatarWithUploadProps {
  token: string;
  onUploadSuccess: (url: string) => void;
}

const AvatarWithUpload: React.FC<AvatarWithUploadProps> = ({
  token,
  onUploadSuccess,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const photoProfile = await getPhotoProfile(token);
        console.log('Foto do usuário:', photoProfile);
        setPhotoUrl(photoProfile);
      } catch (error) {
        console.error('Erro ao buscar foto do usuário:', error);
      }
    };

    fetchPhoto();
  }, [token]);

  const handleUploadSuccess = (url: string) => {
    setPhotoUrl(url);
    onUploadSuccess(url);
    setIsDialogOpen(false); // Fechar o AlertDialog após o upload bem-sucedido
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer group">
          <Avatar className="w-32 h-32 mb-4">
            {photoUrl ? (
              <AvatarImage src={photoUrl} />
            ) : (
              <AvatarFallback className="bg-gray-300 hover:bg-gray-400">
                <Camera className="w-8 h-8 group-hover:w-10 group-hover:h-10 transition-transform duration-200" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Adicionar Foto</AlertDialogTitle>
          <AlertDialogDescription>
            Selecione uma foto para adicionar no perfil.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <UploadAvatar onUploadSuccess={handleUploadSuccess} />
        <AlertDialogFooter>
          <AlertDialogTrigger asChild>
            <Button variant="secondary">Cancelar</Button>
          </AlertDialogTrigger>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AvatarWithUpload;
