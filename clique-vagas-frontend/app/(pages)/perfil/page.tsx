'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Button } from '@/app/_components/ui/button';
import { Separator } from '@/app/_components/ui/separator';
import Certificados from '@/app/_components/Certificados';
import InternInfo from '@/app/_components/InternInfo';
import SkillCard from '@/app/_components/SkillCard';
import { SkillCardForm } from '@/app/_components/SkillCardForm';
import { EditUserInfo } from '@/app/_components/EditUserInfo';
import { getUserProfile } from '@/app/_services/userService';
import { GetUserWithAddressDto } from '@/app/_services/types/User';
import { SkillIntermediateWithIdDto } from '@/app/_services/types/Skill';
import { Certificate } from '@/app/_services/types/Certificate';
import CompanyInfo from '@/app/_components/CompanyInfo';
import { useRouter } from 'next/navigation';
import AvatarWithUpload from '@/app/_components/AvatarWithUpload';
import { getCurriculo } from '@/app/_services/internService';
import { EditCompanyInfo } from '@/app/_components/EditCompanyInfo';

const PerfilPage = () => {
  const router = useRouter();
  const [skills, setSkills] = useState<SkillIntermediateWithIdDto[]>([]);
  const [certificados, setCertificados] = useState<Certificate[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<GetUserWithAddressDto | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const profile: GetUserWithAddressDto = await getUserProfile(token);
          console.log('Perfil do usuário:', profile);
          setUserInfo(profile);
          setSkills(profile.skillIntern || []);
          setCertificados(profile.certificates || []);
        } catch (error) {
          console.error('Erro ao buscar perfil do usuário:', error);
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleSave = (updatedUserInfo: GetUserWithAddressDto) => {
    setUserInfo(updatedUserInfo);
    setIsEditing(false);
  };

  const handleAddSkill = (newSkill: SkillIntermediateWithIdDto) => {
    setSkills((prevSkills) => [...prevSkills, newSkill]);
  };

  const handleDeleteSkill = (id: number) => {
    setSkills((prevSkills) => prevSkills.filter((skill) => skill.id !== id));
  };

  const handleAddCertificado = async (newCertificado: Certificate) => {
    setCertificados((prevCertificados) => [
      ...prevCertificados,
      newCertificado,
    ]);
  };

  const handleUpdateCertificado = async (formData: FormData) => {
    const updatedCertificado: Certificate = {
      id: Number(formData.get('id')),
      name: String(formData.get('name')),
      description: String(formData.get('description')),
      institution: String(formData.get('institution')),
      issuanceDate: String(formData.get('date')),
      creditHours: Number(formData.get('creditHours')),
      file: String(formData.get('url')),
    };
    setCertificados((prevCertificados) =>
      prevCertificados.map((cert) =>
        cert.id === updatedCertificado.id ? updatedCertificado : cert
      )
    );
  };

  const handleDeleteCertificado = async (id: number): Promise<void> => {
    setCertificados((prevCertificados) =>
      prevCertificados.filter((cert) => cert.id !== id)
    );
  };

  const handleUploadSuccess = (url: string) => {
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        user: {
          ...userInfo.user,
          urlImageProfile: url,
        },
      });
    }
  };

  const handleDownloadCurriculo = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token não encontrado');
      return;
    }

    try {
      const blob = await getCurriculo(token);
      const url = window.URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (error) {
      console.error('Erro ao baixar currículo:', error);
    }
  };

  if (!userInfo) {
    window.location.href = '/home';
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Coluna Esquerda */}
              {userInfo.user.role === 'INTERN' && (
                <div className="md:w-1/3 flex flex-col items-center gap-1">
                  <AvatarWithUpload
                    urlImageProfile={userInfo.user.urlImageProfile}
                    onUploadSuccess={handleUploadSuccess}
                    isOwner={true}
                  />
                  <EditUserInfo userInfo={userInfo} onSave={handleSave} />
                  <Button
                    variant="default"
                    className="w-full mb-8"
                    onClick={handleDownloadCurriculo}
                  >
                    <Download className="mr-2 h-4 w-4" /> Currículo
                  </Button>

                  <Separator className="my-1 mb-3" />

                  <div className="w-full">
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="space-y-4 overflow-y-auto max-h-[400px]">
                      {skills.map((skill, index) => (
                        <SkillCard
                          key={index}
                          skill={skill}
                          onDelete={handleDeleteSkill}
                          isOwner={true}
                        />
                      ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                      <SkillCardForm onSubmit={handleAddSkill} />
                    </div>
                  </div>
                </div>
              )}

              {userInfo.user.role === 'COMPANY' && (
                <div className="md:w-1/3 flex flex-col items-center gap-3">
                  <AvatarWithUpload
                    urlImageProfile={userInfo.user.urlImageProfile}
                    onUploadSuccess={handleUploadSuccess}
                    isOwner={true}
                  />
                  <EditCompanyInfo userInfo={userInfo} onSave={handleSave} />{' '}
                  {/* Chamando o novo componente */}
                  <Card className="w-full p-2">
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-4">Descrição</h3>
                      <p className="text-sm text-muted-foreground break-words">
                        {userInfo.user.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              <div className="flex">
                <Separator orientation="vertical" />
              </div>

              {/* Coluna Direita */}
              <div className="md:w-2/3">
                {userInfo.user.role === 'INTERN' && (
                  <>
                    {/* Certificados */}
                    <div className="mb-8">
                      <Certificados
                        certificados={certificados}
                        onAdd={handleAddCertificado}
                        onUpdate={handleUpdateCertificado}
                        onDelete={handleDeleteCertificado}
                        isOwner={true}
                      />
                    </div>

                    <Separator className="my-8" />

                    {/* Informações Pessoais */}
                    {userInfo.intern && <InternInfo userInfo={userInfo} />}
                  </>
                )}

                {userInfo.user.role === 'COMPANY' && (
                  <CompanyInfo userInfo={userInfo} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerfilPage;
