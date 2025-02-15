import { Separator } from './ui/separator';
import { GetUserWithAddressDto } from '@/app/_services/types/User';

interface UserInfoProps {
  userInfo: GetUserWithAddressDto;
}

const InternInfo = ({ userInfo }: UserInfoProps) => {
  const getSexLabel = (sex: 'M' | 'F' | 'OTHER') => {
    switch (sex) {
      case 'M':
        return 'Homem';
      case 'F':
        return 'Mulher';
      case 'OTHER':
        return 'Outro';
      default:
        return '';
    }
  };

  return (
    <div className="max-h-[65vh] overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Informações Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Nome</label>
            <p className="font-medium">{userInfo.user.firstName}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Sobrenome</label>
            <p className="font-medium">{userInfo.user.lastName}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Sexo</label>
            <p className="font-medium">
              {getSexLabel(userInfo.intern?.sex ?? 'OTHER')}
            </p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">CPF</label>
            <p className="font-medium">{userInfo.intern?.cpf}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Telefone</label>
            <p className="font-medium">{userInfo.user.phone}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">E-mail</label>
            <p className="font-medium">{userInfo.user.email}</p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Endereço */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Endereço</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Rua</label>
            <p className="font-medium">{userInfo.address.street}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Número</label>
            <p className="font-medium">{userInfo.address.number}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">CEP</label>
            <p className="font-medium">{userInfo.address.cep}</p>
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

      <Separator className="my-8" />

      {/* Instituição */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Instituição</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userInfo.intern && (
            <>
              <div>
                <label className="text-sm text-muted-foreground">
                  Instituição de Ensino
                </label>
                <p className="font-medium">
                  {userInfo.intern.educationalInstitution}
                </p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Área de Interesse
                </label>
                <p className="font-medium">{userInfo.intern.areaOfInterest}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Ano de Ingresso
                </label>
                <p className="font-medium">{userInfo.intern.yearOfEntry}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Previsão de Formatura
                </label>
                <p className="font-medium">
                  {userInfo.intern.expectedGraduationDate}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InternInfo;
