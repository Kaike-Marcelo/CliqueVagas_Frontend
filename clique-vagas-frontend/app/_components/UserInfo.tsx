import { Separator } from './ui/separator';

interface UserInfoProps {
  userInfo: {
    nome: string;
    sobrenome: string;
    cpf: string;
    telefone: string;
    email: string;
    rua: string;
    numero: string;
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;
    instituicao: string;
    areaInteresse: string;
    anoIngresso: string;
    previsaoFormatura: string;
  };
}

const UserInfo = ({ userInfo }: UserInfoProps) => {
  return (
    <div className="max-h-[440px] overflow-y-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Informações Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Nome</label>
            <p className="font-medium">{userInfo.nome}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Sobrenome</label>
            <p className="font-medium">{userInfo.sobrenome}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">CPF</label>
            <p className="font-medium">{userInfo.cpf}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Telefone</label>
            <p className="font-medium">{userInfo.telefone}</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground">E-mail</label>
            <p className="font-medium">{userInfo.email}</p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Endereço */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Endereço</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground">Rua</label>
            <p className="font-medium">{userInfo.rua}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Número</label>
            <p className="font-medium">{userInfo.numero}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">CEP</label>
            <p className="font-medium">{userInfo.cep}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Bairro</label>
            <p className="font-medium">{userInfo.bairro}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Cidade</label>
            <p className="font-medium">{userInfo.cidade}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Estado</label>
            <p className="font-medium">{userInfo.estado}</p>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Instituição */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Instituição</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">
              Instituição de Ensino
            </label>
            <p className="font-medium">{userInfo.instituicao}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Área de interesse
            </label>
            <p className="font-medium">{userInfo.areaInteresse}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Ano de Ingresso
            </label>
            <p className="font-medium">{userInfo.anoIngresso}</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Previsão de Formatura
            </label>
            <p className="font-medium">{userInfo.previsaoFormatura}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
