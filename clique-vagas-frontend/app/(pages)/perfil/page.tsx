'use client';

import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Card, CardContent } from '@/app/_components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar';
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

const PerfilPage = () => {
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

  if (!userInfo) {
    return <p>Carregando...</p>;
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
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src="https://www.intern-brazil.com.br/wp-content/uploads/2019/12/entendimento-perfil-480x480.png" />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                  <EditUserInfo userInfo={userInfo} onSave={handleSave} />
                  <Button variant="default" className="w-full mb-8">
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
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src="https://www.intern-brazil.com.br/wp-content/uploads/2019/12/entendimento-perfil-480x480.png" />
                    <AvatarFallback>AA</AvatarFallback>
                  </Avatar>
                  <EditUserInfo userInfo={userInfo} onSave={handleSave} />
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
                        certificados={userInfo.certificates || []}
                        setCertificados={setCertificados}
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
