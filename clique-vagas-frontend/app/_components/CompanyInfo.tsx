import React from 'react';
import { GetUserWithAddressDto } from '@/app/_services/types/User';
import { Separator } from '@/app/_components/ui/separator';

interface CompanyInfoProps {
  userInfo: GetUserWithAddressDto;
}

const CompanyInfo: React.FC<CompanyInfoProps> = ({ userInfo }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6">Perfil da Empresa</h2>

      {/* Informações da Empresa */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Informações da Empresa</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">
              Nome da Empresa
            </label>
            <p className="font-medium">{userInfo.company?.companyName}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">CNPJ</label>
            <p className="font-medium">{userInfo.company?.cnpj}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">E-mail</label>
            <p className="font-medium">{userInfo.user.email}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Telefone</label>
            <p className="font-medium">{userInfo.user.phone}</p>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Informações do Responsável */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Informações do Responsável
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">
              Nome do Responsável
            </label>
            <p className="font-medium">{userInfo.user.firstName}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Telefone do Responsável
            </label>
            <p className="font-medium">
              {userInfo.company?.telephoneResponsible}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Endereço */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Endereço</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">CEP</label>
            <p className="font-medium">{userInfo.address.cep}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Rua</label>
            <p className="font-medium">{userInfo.address.street}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Número</label>
            <p className="font-medium">{userInfo.address.number}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Bairro</label>
            <p className="font-medium">{userInfo.address.neighborhood}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Cidade</label>
            <p className="font-medium">{userInfo.address.city}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Estado</label>
            <p className="font-medium">{userInfo.address.state}</p>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Informações Adicionais */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Informações Adicionais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">
              Setor de Atuação
            </label>
            <p className="font-medium">{userInfo.company?.sectorOfOperation}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Link do Website
            </label>
            <p className="font-medium">{userInfo.company?.websiteLink}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
