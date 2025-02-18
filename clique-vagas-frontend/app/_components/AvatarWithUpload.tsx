import React, { useState } from 'react';
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

interface AvatarWithUploadProps {
  urlImageProfile: string;
  onUploadSuccess?: (url: string) => void;
  isOwner: boolean;
}

const AvatarWithUpload: React.FC<AvatarWithUploadProps> = ({
  urlImageProfile,
  onUploadSuccess,
  isOwner,
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    `data:image/png;base64,${urlImageProfile}`
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleUploadSuccess = (url: string) => {
    setPhotoUrl(url);
    onUploadSuccess?.(url);
    setIsDialogOpen(false);
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      {isOwner ? (
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
      ) : (
        <div className="cursor-default">
          <Avatar className="w-32 h-32 mb-4">
            {photoUrl ? (
              <AvatarImage src={photoUrl} />
            ) : (
              <AvatarFallback className="bg-gray-300">
                <Camera className="w-8 h-8" />
              </AvatarFallback>
            )}
          </Avatar>
        </div>
      )}
      {isOwner && (
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
      )}
    </AlertDialog>
  );
};

export default AvatarWithUpload;
