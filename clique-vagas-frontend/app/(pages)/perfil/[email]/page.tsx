'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Separator } from '@/app/_components/ui/separator';
import Certificados from '@/app/_components/Certificados';
import InternInfo from '@/app/_components/InternInfo';
import SkillCard from '@/app/_components/SkillCard';
import CompanyInfo from '@/app/_components/CompanyInfo';
import AvatarWithUpload from '@/app/_components/AvatarWithUpload';
import { getUserProfileByEmail } from '@/app/_services/userService';
import { GetUserWithAddressDto } from '@/app/_services/types/User';
import { SkillIntermediateWithIdDto } from '@/app/_services/types/Skill';
import { Certificate } from '@/app/_services/types/Certificate';

const PerfilPage = () => {
  const params = useParams();
  const email = params.email as string;
  const [skills, setSkills] = useState<SkillIntermediateWithIdDto[]>([]);
  const [certificados, setCertificados] = useState<Certificate[]>([]);
  const [userInfo, setUserInfo] = useState<GetUserWithAddressDto | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (email) {
        try {
          const profile: GetUserWithAddressDto =
            await getUserProfileByEmail(email);
          console.log('Perfil do usuário para visualização:', profile);
          setUserInfo(profile);
          setSkills(profile.skillIntern || []);
          setCertificados(profile.certificates || []);
        } catch (error) {
          console.error('Erro ao buscar perfil do usuário:', error);
        }
      }
    };

    fetchUserProfile();
  }, [email]);

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
                    isOwner={false}
                  />
                  <Card className="w-full p-2">
                    <CardContent>
                      <h3 className="text-lg font-semibold mb-4">Descrição</h3>
                      <p className="text-sm text-muted-foreground break-words">
                        {userInfo.user.description}
                      </p>
                    </CardContent>
                  </Card>
                  <Separator className="my-1 mb-3" />
                  <div className="w-full">
                    <h3 className="text-lg font-semibold mb-4">Skills</h3>
                    <div className="space-y-4 overflow-y-auto max-h-[400px]">
                      {skills.map((skill, index) => (
                        <SkillCard key={index} skill={skill} isOwner={false} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {userInfo.user.role === 'COMPANY' && (
                <div className="md:w-1/3 flex flex-col items-center gap-3">
                  <AvatarWithUpload
                    urlImageProfile={userInfo.user.urlImageProfile}
                    isOwner={false}
                  />
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
                        isOwner={false}
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
