# Como Configurar o Projeto Localmente

Este guia descreve como copiar o repositório principal, instalar as dependências e criar suas próprias branches para colaborar no projeto.

---

## **Pré-requisitos**
Certifique-se de ter as seguintes ferramentas instaladas no seu sistema:

- [Node.js](https://nodejs.org) (versão 16 ou superior)
- [Git](https://git-scm.com/)
- Um editor de código, como [VS Code](https://code.visualstudio.com/)

---

## **1. Clonar o Repositório Principal**

1. Abra o terminal.
2. Navegue até o diretório onde deseja salvar o projeto.
3. Execute o comando abaixo para clonar o repositório:
   ```bash
   git clone https://github.com/Kaike-Marcelo/CliqueVagas_Frontend.git
   ```
4. Acesse o diretório do projeto clonado:
   ```bash
   cd CliqueVagas_Frontend/clique-vagas-frontend
   ```

---

## **2. Instalar as Dependências**

1. Certifique-se de que está na raiz do projeto `clique-vagas-frontend`.
2. Execute o comando para instalar as dependências do projeto:
   ```bash
   npm install
   ```
3. Após a instalação, verifique se o projeto está funcionando executando o comando:
   ```bash
   npm run dev
   ```
4. Acesse o endereço [http://localhost:3000](http://localhost:3000) em seu navegador para visualizar o projeto.

---

## **3. Criar uma Branch para Trabalhar**

1. Sempre crie uma nova branch a partir da branch `main`.
2. Certifique-se de estar na branch correta antes de criar uma nova:
   ```bash
   git checkout main
   ```
3. Atualize a branch local com as últimas alterações do repositório remoto:
   ```bash
   git pull origin main
   ```
4. Crie uma nova branch para a sua tarefa/funcionalidade:
   ```bash
   git checkout -b feature/nome-da-tarefa
   ```
   Use o prefixo `feature/` para novas funcionalidades ou `fix/` para correções de bugs.

---

## **4. Enviar Alterações para o Repositório Remoto**

1. Após finalizar as alterações, adicione os arquivos modificados ao Git:
   ```bash
   git add .
   ```
2. Faça o commit com uma mensagem clara:
   ```bash
   git commit -m "Descrição clara da alteração"
   ```
3. Envie a branch para o repositório remoto:
   ```bash
   git push origin feature/nome-da-tarefa
   ```
4. Acesse o repositório no GitHub e abra um **Pull Request (PR)** para mesclar a sua branch na branch `main`.

---

## **5. Dicas Importantes**

- **Atualize regularmente sua branch**: Sincronize sua branch com a branch `main` para evitar conflitos:
  ```bash
  git pull origin main
  ```

- **Siga o padrão de commits**: Use mensagens de commit claras e informativas.

- **Revise seu código**: Antes de abrir um Pull Request, revise seu código e verifique erros de lint e formatação:
  ```bash
  npm run lint
  npm run format
  ```

- **Peça revisão do PR**: Marque um colega de equipe como revisor no Pull Request.

---