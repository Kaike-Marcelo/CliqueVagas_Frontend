import { Separator } from './ui/separator';

const UserInfo = () => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Informações Pessoais</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-muted-foreground">Nome</label>
            <p className="font-medium">Alberto Alves</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Sobrenome</label>
            <p className="font-medium">Almeida Amorim</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">CPF</label>
            <p className="font-medium">123.456.789-10</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Telefone</label>
            <p className="font-medium">(73) 98888-8888</p>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-muted-foreground">E-mail</label>
            <p className="font-medium">albertinhoalmeida@gmail.com</p>
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
            <p className="font-medium">Camargo de Solimões</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Número</label>
            <p className="font-medium">123</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">CEP</label>
            <p className="font-medium">282828-282</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Bairro</label>
            <p className="font-medium">Sapucaeira</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Cidade</label>
            <p className="font-medium">Eunápolis</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">Estado</label>
            <p className="font-medium">BA</p>
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
            <p className="font-medium">IFBA</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Área de interesse
            </label>
            <p className="font-medium">Marketing</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Ano de Ingresso
            </label>
            <p className="font-medium">02/2018</p>
          </div>
          <div>
            <label className="text-sm text-muted-foreground">
              Previsão de Formatura
            </label>
            <p className="font-medium">06/2045</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
