'use client';

import { useState } from 'react';
import { Download, Edit, PlusCircle } from 'lucide-react';
import { Card, CardContent } from '../_components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../_components/ui/avatar';
import { Button } from '../_components/ui/button';
import { Separator } from '../_components/ui/separator';
import Certificados from '../_components/Certificados';
import UserInfo from '../_components/UserInfo';
import SkillCard from '../_components/SkillCard';
import { SkillCardForm } from '../_components/SkillCardForm';
import { EditUserInfo } from '../_components/EditUserInfo';

const PerfilPage = () => {
  const [skills, setSkills] = useState([
    {
      setor: 'Marketing',
      tipo: 'SoftSkill',
      skill: 'Persuasão',
      nivel: 'Avançado',
    },
    {
      setor: 'Design',
      tipo: 'HardSkill',
      skill: 'UI/UX',
      nivel: 'Intermediário',
    },
  ]);

  const certificados = [
    {
      title: 'Marketing Digital',
      image:
        'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: 'Social Media',
      image:
        'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: 'Google Analytics',
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: 'SEO Avançado',
      image:
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: 'Gestão de Tráfego',
      image:
        'https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: 'Copywriting',
      image:
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
    {
      title: 'Branding',
      image:
        'https://images.unsplash.com/photo-1493612276216-ee3925520721?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    },
  ];

  const addSkill = (newSkill: {
    setor: string;
    tipo: string;
    skill: string;
    nivel: string;
  }) => {
    setSkills([...skills, newSkill]);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nome: 'Alberto',
    sobrenome: 'Almeida Amorim',
    cpf: '123.456.789-10',
    telefone: '(73) 98888-8888',
    email: 'albertinhoalmeida@gmail.com',
    rua: 'Camargo de Solimões',
    numero: '123',
    cep: '282828-282',
    bairro: 'Sapucaeira',
    cidade: 'Eunápolis',
    estado: 'BA',
    instituicao: 'IFBA',
    areaInteresse: 'Marketing',
    anoIngresso: '02/2018',
    previsaoFormatura: '06/2045',
  });

  const handleSave = (updatedUserInfo: typeof userInfo) => {
    setUserInfo(updatedUserInfo);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Coluna Esquerda */}
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
                      <SkillCard key={index} skill={skill} index={index} />
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center">
                    <SkillCardForm onSubmit={addSkill} />
                  </div>
                </div>
              </div>
              <div className="flex">
                <Separator orientation="vertical" />
              </div>

              {/* Coluna Direita */}
              <div className="md:w-2/3">
                {/* Certificados */}
                <div className="mb-8">
                  <Certificados certificados={certificados} />
                </div>

                <Separator className="my-8" />

                {/* Informações Pessoais */}
                <UserInfo userInfo={userInfo} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PerfilPage;
