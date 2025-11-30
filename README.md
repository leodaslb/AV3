# AV3


# Aerocode - Sistema de Gestão de Produção de Aeronaves

Sistema web Full Stack desenvolvido para o gerenciamento de produção de aeronaves, abrangendo controle de peças, etapas de montagem, testes de qualidade e gestão de funcionários.

Este projeto foi desenvolvido como parte da avaliação AV3, focando em arquitetura crítica, performance e qualidade de software.

## Tecnologias Utilizadas

- **Linguagem:** TypeScript
- **Front-end:** React (Next.js)
- **Back-end:** Node.js com Express
- **Banco de Dados:** MySQL
- **ORM:** Prisma
- **Métricas:** Monitoramento de latência e tempo de processamento

## Pré-requisitos

Para executar este projeto, você precisará ter instalado:

- Node.js (versão 18 ou superior)
- MySQL

## Instalação e Execução

O projeto está dividido em duas pastas principais: `back` e `front`. É necessário rodar ambos simultaneamente.

### 1. Configuração do Back-end

Navegue até a pasta do servidor, instale as dependências e configure o banco de dados.

```bash
cd back
npm install 
```
Crie um arquivo .env na raiz da pasta backend e configure a URL do seu banco de dados MySQL com o seguinte conteudo:

DATABASE_URL="mysql://usuario:senha@localhost:3306/aerocode_db"

Em seguida, execute as migrações para criar as tabelas e o seed para popular o banco com dados iniciais:

```bash

npx prisma db push
npx prisma db seed
```
Inicie o servidor:

```bash

npx ts-node src/server.ts
O servidor rodará em: http://localhost:3001
```

2. Configuração do Front-end
Abra um novo terminal, navegue até a pasta do front-end e instale as dependências.

```Bash

cd front
npm install
```
Inicie a aplicação web:

```Bash

npm run dev
A aplicação rodará em: http://localhost:3000
```

Acesso ao Sistema
Após iniciar a aplicação, utilize as seguintes credenciais padrão para acesso administrativo:

Usuário: admin

Senha: 123
