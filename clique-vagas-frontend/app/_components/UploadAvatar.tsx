import React, { useState } from 'react';
import { Button } from './ui/button';
import { addPhotoUser } from '../_services/userService';

interface UploadAvatarProps {
  onUploadSuccess: (url: string) => void;
}

const UploadAvatar: React.FC<UploadAvatarProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      console.log('Form Data:', formData);
      console.log('Selected File:', selectedFile);

      await addPhotoUser(formData, token);
      const photoUrl = URL.createObjectURL(selectedFile);
      console.log('Foto URL:', photoUrl);
      onUploadSuccess(photoUrl);
    } catch (error) {
      console.error('Erro ao fazer upload da foto:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={isUploading || !selectedFile}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>
    </div>
  );
};

export default UploadAvatar;
